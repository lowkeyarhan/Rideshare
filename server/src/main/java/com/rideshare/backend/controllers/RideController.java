package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.PageResponse;
import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.mapper.RideMapper;
import com.rideshare.backend.model.Ride;
import com.rideshare.backend.model.enums.Status;
import com.rideshare.backend.service.RideQueryService;
import com.rideshare.backend.service.RideService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rides")
public class RideController {

    private final RideService rideService;
    private final RideQueryService rideQueryService;

    public RideController(RideService rideService, RideQueryService rideQueryService) {
        this.rideService = rideService;
        this.rideQueryService = rideQueryService;
    }

    // USER: Create a new ride request
    @PostMapping
    public ResponseEntity<RideResponse> createRide(
            @Valid @RequestBody RideRequest request,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.createRide(request, authHeader));
    }

    // USER: Get all rides taken by the authenticated user
    @GetMapping("/me")
    public ResponseEntity<List<RideResponse>> getAuthenticatedUserRides(
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.getUserRides(authHeader));
    }

    // DRIVER: Get all rides assigned to the authenticated driver
    @GetMapping("/driver/me")
    public ResponseEntity<List<RideResponse>> getAuthenticatedDriverRides(
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.getDriverRides(authHeader));
    }

    // DRIVER: Get all pending ride requests
    @GetMapping("/pending")
    public ResponseEntity<List<RideResponse>> getPendingRides() {
        return ResponseEntity.ok(rideService.getPendingRides());
    }

    // DRIVER: Accept a ride request
    @PostMapping("/accept/{rideId}")
    public ResponseEntity<RideResponse> acceptRide(
            @PathVariable String rideId,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.acceptRide(rideId, authHeader));
    }

    // DRIVER: Complete a ride
    @PostMapping("/complete/{rideId}")
    public ResponseEntity<RideResponse> completeRide(@PathVariable String rideId) {
        return ResponseEntity.ok(rideService.completeRide(rideId));
    }

    // Admin & Driver: Advanced ride queries
    @GetMapping("/search")
    public ResponseEntity<List<RideResponse>> searchRides(@RequestParam("text") String keyword) {
        return ResponseEntity.ok(toResponses(rideQueryService.searchByPickupOrDrop(keyword)));
    }

    // Admin: Filter rides by distance range
    @GetMapping("/filter-distance")
    public ResponseEntity<List<RideResponse>> filterByDistance(
            @RequestParam(value = "min", required = false) Double min,
            @RequestParam(value = "max", required = false) Double max) {
        return ResponseEntity.ok(toResponses(rideQueryService.filterByDistance(min, max)));
    }

    // Admin: Filter rides by date range
    @GetMapping("/filter-date-range")
    public ResponseEntity<List<RideResponse>> filterByDateRange(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(toResponses(rideQueryService.filterByDateRange(start, end)));
    }

    // Admin: Sort rides by fare amount
    @GetMapping("/sort")
    public ResponseEntity<List<RideResponse>> sortByFare(
            @RequestParam(value = "order", defaultValue = "asc") String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        return ResponseEntity.ok(toResponses(rideQueryService.sortByFare(direction)));
    }

    // Admin: Get rides for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RideResponse>> ridesForUser(@PathVariable String userId) {
        return ResponseEntity.ok(rideService.getRidesForUser(userId));
    }

    // Admin: Get rides for a specific user filtered by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<RideResponse>> ridesForUserByStatus(
            @PathVariable String userId,
            @PathVariable Status status) {
        return ResponseEntity.ok(rideService.getRidesForUserByStatus(userId, status));
    }

    // Admin: Get active rides for a specific driver
    @GetMapping("/driver/{driverId}/active-rides")
    public ResponseEntity<List<RideResponse>> activeRidesForDriver(@PathVariable String driverId) {
        return ResponseEntity.ok(rideService.getActiveRidesForDriver(driverId));
    }

    // Admin: Filter rides by status and keyword
    @GetMapping("/filter-status")
    public ResponseEntity<List<RideResponse>> filterByStatusAndKeyword(
            @RequestParam("status") Status status,
            @RequestParam(value = "search", required = false) String search) {
        return ResponseEntity.ok(toResponses(rideQueryService.filterByStatusAndKeyword(status, search)));
    }

    // Admin: Advanced search with pagination and sorting
    @GetMapping("/advanced-search")
    public ResponseEntity<PageResponse<RideResponse>> advancedSearch(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "status", required = false) Status status,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "order", defaultValue = "asc") String order,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Sort.Direction direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Page<Ride> ridesPage = rideQueryService.advancedSearch(search, status, sort, direction, page, size);
        return ResponseEntity.ok(toPageResponse(ridesPage));
    }

    // Admin: Get rides on a specific date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<RideResponse>> ridesOnDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(rideService.getRidesOnDate(date));
    }

    // Helper methods to convert Ride entities to RideResponse DTOs
    private List<RideResponse> toResponses(List<Ride> rides) {
        return rides.stream().map(RideMapper::toResponse).collect(Collectors.toList());
    }

    // Helper method to convert Page<Ride> to PageResponse<RideResponse>
    private PageResponse<RideResponse> toPageResponse(Page<Ride> page) {
        List<RideResponse> content = page.getContent().stream()
                .map(RideMapper::toResponse)
                .collect(Collectors.toList());
        return new PageResponse<>(content,
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize(),
                page.isLast());
    }
}
