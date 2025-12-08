package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.service.RideService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class RideController {

    @Autowired
    private RideService rideService;

    // USER: Request a ride
    @PostMapping("/rides")
    public ResponseEntity<RideResponse> createRide(
            @Valid @RequestBody RideRequest request,
            @RequestHeader("Authorization") String authHeader) {
        RideResponse response = rideService.createRide(request, authHeader);
        return ResponseEntity.ok(response);
    }

    // USER: View all the rides taken by them
    @GetMapping("/user/rides")
    public ResponseEntity<List<RideResponse>> getUserRides(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.getUserRides(authHeader));
    }

    // DRIVER: Get all rides assigned to the driver
    @GetMapping("/driver/rides")
    public ResponseEntity<List<RideResponse>> getDriverRides(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.getDriverRides(authHeader));
    }

    // DRIVER: View pending ride requests with status 'REQUESTED'
    @GetMapping("/driver/rides/requests")
    public ResponseEntity<List<RideResponse>> getPendingRides() {
        return ResponseEntity.ok(rideService.getPendingRides());
    }

    // DRIVER: Accept a ride and change its status to 'ACCEPTED'
    @PostMapping("/driver/rides/{rideId}/accept")
    public ResponseEntity<RideResponse> acceptRide(
            @PathVariable String rideId,
            @RequestHeader("Authorization") String authHeader) {
        RideResponse response = rideService.acceptRide(rideId, authHeader);
        return ResponseEntity.ok(response);
    }

    // USER/DRIVER: Complete a ride and change its status to 'COMPLETED'
    @PostMapping("/rides/{rideId}/complete")
    public ResponseEntity<RideResponse> completeRide(@PathVariable String rideId) {
        RideResponse response = rideService.completeRide(rideId);
        return ResponseEntity.ok(response);
    }
}
