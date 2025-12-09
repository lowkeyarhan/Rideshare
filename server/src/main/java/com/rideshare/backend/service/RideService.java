package com.rideshare.backend.service;

import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.exception.BadRequestException;
import com.rideshare.backend.exception.NotFoundException;
import com.rideshare.backend.mapper.RideMapper;
import com.rideshare.backend.model.Ride;
import com.rideshare.backend.model.User;
import com.rideshare.backend.model.enums.Status;
import com.rideshare.backend.repository.RideRepository;
import com.rideshare.backend.utils.JwtUtil;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    // Constructor injection
    public RideService(RideRepository rideRepository, JwtUtil jwtUtil, UserService userService) {
        this.rideRepository = rideRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    // Create a new ride request
    public RideResponse createRide(RideRequest request, String authHeader) {
        User passenger = userService.getByUsername(extractUsername(authHeader));

        Ride ride = RideMapper.toEntity(request);
        ride.setUserId(passenger.getId());
        ride.setPassengerUsername(passenger.getUsername());
        ride.setStatus(Status.REQUESTED);
        ride.setCreatedDate(LocalDate.now());
        LocalDateTime now = LocalDateTime.now();
        ride.setCreatedAt(now);
        ride.setUpdatedAt(now);

        Ride saved = rideRepository.save(ride);
        return RideMapper.toResponse(saved);
    }

    // Get all rides taken by the authenticated user
    public List<RideResponse> getUserRides(String authHeader) {
        User passenger = userService.getByUsername(extractUsername(authHeader));
        return rideRepository.findByUserId(passenger.getId()).stream()
                .map(RideMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Get all rides assigned to the authenticated driver
    public List<RideResponse> getDriverRides(String authHeader) {
        User driver = userService.getByUsername(extractUsername(authHeader));
        return rideRepository.findByDriverId(driver.getId()).stream()
                .map(RideMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Get all pending ride requests with status REQUESTED
    public List<RideResponse> getPendingRides() {
        return rideRepository.findByStatus(Status.REQUESTED).stream()
                .filter(ride -> ride.getDriverId() == null)
                .map(RideMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Driver accepts a ride request
    @Transactional
    public RideResponse acceptRide(String rideId, String authHeader) {
        User driver = userService.getByUsername(extractUsername(authHeader));
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new NotFoundException("Ride not found"));

        if (ride.getStatus() != Status.REQUESTED) {
            throw new BadRequestException("Ride must be in REQUESTED status");
        }

        ride.setDriverId(driver.getId());
        ride.setDriverUsername(driver.getUsername());
        ride.setStatus(Status.ACCEPTED);
        ride.setUpdatedAt(LocalDateTime.now());

        return RideMapper.toResponse(rideRepository.save(ride));
    }

    // Complete a ride
    public RideResponse completeRide(String rideId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new NotFoundException("Ride not found"));

        if (ride.getStatus() != Status.ACCEPTED) {
            throw new BadRequestException("Ride must be in ACCEPTED status");
        }

        ride.setStatus(Status.COMPLETED);
        ride.setUpdatedAt(LocalDateTime.now());
        return RideMapper.toResponse(rideRepository.save(ride));
    }

    // Helper method to extract username from Authorization header
    private String extractUsername(String authHeader) {
        String token = authHeader.substring(7);
        return jwtUtil.getUsernameFromToken(token);
    }

    // fetch rides taken by a specific user
    public List<RideResponse> getRidesForUser(String userId) {
        return mapRides(rideRepository.findByUserId(userId));
    }

    // fetch rides for a user filtered by status
    public List<RideResponse> getRidesForUserByStatus(String userId, Status status) {
        return mapRides(rideRepository.findByUserIdAndStatus(userId, status));
    }

    // fetch active rides for a driver
    public List<RideResponse> getActiveRidesForDriver(String driverId) {
        return mapRides(rideRepository.findByDriverIdAndStatus(driverId, Status.ACCEPTED));
    }

    // fetch rides on a specific date
    public List<RideResponse> getRidesOnDate(LocalDate date) {
        return mapRides(rideRepository.findByCreatedDate(date));
    }

    // utility method to map list of Ride entities to RideResponse DTOs
    private List<RideResponse> mapRides(List<Ride> rides) {
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }
}