package com.rideshare.backend.service;

import com.rideshare.backend.utils.JwtUtil;
import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.exception.BadRequestException;
import com.rideshare.backend.exception.NotFoundException;
import com.rideshare.backend.mapper.RideMapper;
import com.rideshare.backend.model.Ride;
import com.rideshare.backend.model.enums.Status;
import com.rideshare.backend.repository.RideRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    // USER: Request a ride
    public RideResponse createRide(RideRequest request, String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);

        Ride ride = new Ride();
        ride.setUserId(userService.findByUsername(username).getId());
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDropLocation(request.getDropLocation());
        ride.setStatus(Status.REQUESTED);
        ride.setCreatedAt(LocalDateTime.now());

        Ride saved = rideRepository.requestRide(ride);
        return RideMapper.toResponse(saved);
    }

    // USER: Get all the rides taken by the user
    public List<RideResponse> getUserRides(String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);
        String userId = userService.findByUsername(username).getId();

        List<Ride> rides = rideRepository.getRidesByUserId(userId);
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // DRIVER: View pending ride requests with status 'REQUESTED'
    public List<RideResponse> getPendingRides() {
        List<Ride> rides = rideRepository.getPendingRides();
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // DRIVER: Get all rides assigned to the driver
    public List<RideResponse> getDriverRides(String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);
        String driverId = userService.findByUsername(username).getId();

        List<Ride> rides = rideRepository.getRidesByDriverId(driverId);
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // DRIVER: Accept a ride and change its status to 'ACCEPTED'
    public RideResponse acceptRide(String rideId, String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);
        String driverId = userService.findByUsername(username).getId();

        Ride ride = rideRepository.getRideById(rideId);
        if (ride == null) {
            throw new NotFoundException("Ride not found");
        }
        if (ride.getStatus() != Status.REQUESTED) {
            throw new BadRequestException("Ride must be in REQUESTED status");
        }

        ride.setDriverId(driverId);
        ride.setStatus(Status.ACCEPTED);

        Ride updated = rideRepository.updateRide(ride);
        return RideMapper.toResponse(updated);
    }

    // USER/DRIVER: Complete a ride and change its status to 'COMPLETED'
    public RideResponse completeRide(String rideId) {
        Ride ride = rideRepository.getRideById(rideId);
        if (ride == null) {
            throw new NotFoundException("Ride not found");
        }
        if (ride.getStatus() != Status.ACCEPTED) {
            throw new BadRequestException("Ride must be in ACCEPTED status");
        }

        ride.setStatus(Status.COMPLETED);

        Ride updated = rideRepository.updateRide(ride);
        return RideMapper.toResponse(updated);
    }
}