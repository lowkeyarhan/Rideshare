package com.rideshare.backend.mapper;

import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.model.Ride;

public class RideMapper {

    private RideMapper() {
    }

    // client to server
    public static Ride toEntity(RideRequest request) {
        Ride ride = new Ride();
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDropLocation(request.getDropLocation());
        ride.setDistanceKm(request.getDistanceKm() != null ? request.getDistanceKm() : 0.0);
        ride.setFareAmount(request.getFareAmount() != null ? request.getFareAmount() : 0.0);
        return ride;
    }

    // server to client
    public static RideResponse toResponse(Ride ride) {
        RideResponse response = new RideResponse();
        response.setId(ride.getId());
        response.setUserId(ride.getUserId());
        response.setPassengerUsername(ride.getPassengerUsername());
        response.setDriverId(ride.getDriverId());
        response.setDriverUsername(ride.getDriverUsername());
        response.setPickupLocation(ride.getPickupLocation());
        response.setDropLocation(ride.getDropLocation());
        response.setDistanceKm(ride.getDistanceKm());
        response.setFareAmount(ride.getFareAmount());
        response.setStatus(ride.getStatus());
        response.setCreatedDate(ride.getCreatedDate());
        response.setCreatedAt(ride.getCreatedAt());
        response.setUpdatedAt(ride.getUpdatedAt());
        return response;
    }
}
