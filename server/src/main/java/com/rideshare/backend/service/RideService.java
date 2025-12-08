package com.rideshare.backend.service;

import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.dto.RideUpdateRequest;
import com.rideshare.backend.mapper.RideMapper;
import com.rideshare.backend.model.Ride;
import com.rideshare.backend.repository.RideRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    // user requests a ride
    public RideResponse createRide(RideRequest request) {
        Ride ride = RideMapper.toEntity(request);
        Ride saved = rideRepository.requestRide(ride);
        return RideMapper.toResponse(saved);
    }

    // user views rides taken by them
    public List<RideResponse> getRidesByUser(String userId) {
        List<Ride> rides = rideRepository.getRidesByUserId(userId);
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // driver views rides taken by them
    public List<RideResponse> getRidesByDriver(String driverId) {
        List<Ride> rides = rideRepository.getRidesByDriverId(driverId);
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // get available rides (REQUESTED status with no driver assigned)
    public List<RideResponse> getAvailableRides() {
        List<Ride> rides = rideRepository.getAvailableRides();
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // driver accepts/completes a ride (update ride status and assign driverId)
    public RideResponse updateRide(String rideId, RideUpdateRequest request) {
        Ride existingRide = rideRepository.getRideById(rideId);
        if (existingRide == null) {
            throw new RuntimeException("Ride not found with id: " + rideId);
        }

        // Update only the fields that are provided
        if (request.getDriverId() != null) {
            existingRide.setDriverId(request.getDriverId());
        }
        if (request.getStatus() != null) {
            existingRide.setStatus(request.getStatus());
        }

        Ride updated = rideRepository.updateRide(existingRide);
        return RideMapper.toResponse(updated);
    }

    // driver views pending ride requests (rides with status 'REQUESTED')
    public List<RideResponse> getPendingRides() {
        List<Ride> rides = rideRepository.getPendingRides();
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }
}
