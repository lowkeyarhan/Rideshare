package com.rideshare.backend.mapper;

import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.model.Ride;
import java.time.LocalDateTime;

public class RideMapper {

    private RideMapper() {
    }

    public static Ride toEntity(RideRequest request) {
        Ride ride = new Ride();
        ride.setUserId(request.getUserId());
        ride.setDriverId(request.getDriverId());
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDropLocation(request.getDropLocation());
        ride.setStatus(request.getStatus());
        ride.setRideTime(LocalDateTime.now());
        ride.setFare(request.getFare());
        return ride;
    }

    public static RideResponse toResponse(Ride ride) {
        RideResponse response = new RideResponse();
        response.setId(ride.getId());
        response.setUserId(ride.getUserId());
        response.setDriverId(ride.getDriverId());
        response.setPickupLocation(ride.getPickupLocation());
        response.setDropLocation(ride.getDropLocation());
        response.setStatus(ride.getStatus());
        response.setRideTime(ride.getRideTime());
        response.setFare(ride.getFare());
        return response;
    }
}
