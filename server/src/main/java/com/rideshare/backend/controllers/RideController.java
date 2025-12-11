package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.PageResponse;
import com.rideshare.backend.dto.RideRequest;
import com.rideshare.backend.dto.RideResponse;
import com.rideshare.backend.mapper.RideMapper;
import com.rideshare.backend.model.Ride;
import com.rideshare.backend.model.enums.Status;
import com.rideshare.backend.service.RideQueryService;
import com.rideshare.backend.service.RideService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Rides", description = "Ride management endpoints for users and drivers")
@SecurityRequirement(name = "Bearer Authentication")
public class RideController {

    private final RideService rideService;
    private final RideQueryService rideQueryService;

    public RideController(RideService rideService, RideQueryService rideQueryService) {
        this.rideService = rideService;
        this.rideQueryService = rideQueryService;
    }

    // USER: Create a new ride request
    @Operation(summary = "Create a new ride request", description = "Creates a new ride request for the authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ride created successfully", content = @Content(schema = @Schema(implementation = RideResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
    @PostMapping
    public ResponseEntity<RideResponse> createRide(
            @Valid @RequestBody RideRequest request,
            @Parameter(description = "JWT Bearer token", required = true) @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.createRide(request, authHeader));
    }

    // USER: Get all rides taken by the authenticated user
    @Operation(summary = "Get user's rides", description = "Retrieves all rides for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Rides retrieved successfully")
    @GetMapping("/me")
    public ResponseEntity<List<RideResponse>> getAuthenticatedUserRides(
            @Parameter(description = "JWT Bearer token", required = true) @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.getUserRides(authHeader));
    }

    // DRIVER: Get all rides assigned to the authenticated driver
    @Operation(summary = "Get driver's assigned rides", description = "Retrieves all rides assigned to the authenticated driver")
    @ApiResponse(responseCode = "200", description = "Driver rides retrieved successfully")
    @GetMapping("/driver/me")
    public ResponseEntity<List<RideResponse>> getAuthenticatedDriverRides(
            @Parameter(description = "JWT Bearer token", required = true) @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.getDriverRides(authHeader));
    }

    // DRIVER: Get all pending ride requests
    @Operation(summary = "Get pending ride requests", description = "Retrieves all ride requests with REQUESTED status")
    @ApiResponse(responseCode = "200", description = "Pending rides retrieved successfully")
    @GetMapping("/pending")
    public ResponseEntity<List<RideResponse>> getPendingRides() {
        return ResponseEntity.ok(rideService.getPendingRides());
    }

    // DRIVER: Accept a ride request
    @Operation(summary = "Accept a ride request", description = "Driver accepts a pending ride request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ride accepted successfully"),
            @ApiResponse(responseCode = "404", description = "Ride not found")
    })
    @PostMapping("/accept/{rideId}")
    public ResponseEntity<RideResponse> acceptRide(
            @Parameter(description = "Ride ID", required = true) @PathVariable String rideId,
            @Parameter(description = "JWT Bearer token", required = true) @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(rideService.acceptRide(rideId, authHeader));
    }

    // DRIVER: Complete a ride
    @Operation(summary = "Complete a ride", description = "Marks an accepted ride as completed")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ride completed successfully"),
            @ApiResponse(responseCode = "404", description = "Ride not found")
    })
    @PostMapping("/complete/{rideId}")
    public ResponseEntity<RideResponse> completeRide(
            @Parameter(description = "Ride ID", required = true) @PathVariable String rideId) {
        return ResponseEntity.ok(rideService.completeRide(rideId));
    }

    // Admin & Driver: Advanced ride queries
    @Operation(summary = "Search rides", description = "Search rides by pickup or drop location keyword")
    @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    @GetMapping("/search")
    public ResponseEntity<List<RideResponse>> searchRides(
            @Parameter(description = "Search keyword for pickup/drop location", required = true) @RequestParam("text") String keyword) {
        return ResponseEntity.ok(toResponses(rideQueryService.searchByPickupOrDrop(keyword)));
    }

    // Admin: Filter rides by distance range
    @Operation(summary = "Filter rides by distance", description = "Filter rides within a distance range (km)")
    @ApiResponse(responseCode = "200", description = "Filtered rides retrieved successfully")
    @GetMapping("/filter-distance")
    public ResponseEntity<List<RideResponse>> filterByDistance(
            @Parameter(description = "Minimum distance in km") @RequestParam(value = "min", required = false) Double min,
            @Parameter(description = "Maximum distance in km") @RequestParam(value = "max", required = false) Double max) {
        return ResponseEntity.ok(toResponses(rideQueryService.filterByDistance(min, max)));
    }

    // Admin: Filter rides by date range
    @Operation(summary = "Filter rides by date range", description = "Filter rides created within a specific date range")
    @ApiResponse(responseCode = "200", description = "Filtered rides retrieved successfully")
    @GetMapping("/filter-date-range")
    public ResponseEntity<List<RideResponse>> filterByDateRange(
            @Parameter(description = "Start date (YYYY-MM-DD)") @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @Parameter(description = "End date (YYYY-MM-DD)") @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(toResponses(rideQueryService.filterByDateRange(start, end)));
    }

    // Admin: Sort rides by fare amount
    @Operation(summary = "Sort rides by fare", description = "Sort rides by fare amount in ascending or descending order")
    @ApiResponse(responseCode = "200", description = "Sorted rides retrieved successfully")
    @GetMapping("/sort")
    public ResponseEntity<List<RideResponse>> sortByFare(
            @Parameter(description = "Sort order (asc/desc)") @RequestParam(value = "order", defaultValue = "asc") String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        return ResponseEntity.ok(toResponses(rideQueryService.sortByFare(direction)));
    }

    // Admin: Get rides for a specific user
    @Operation(summary = "Get rides for a specific user", description = "Retrieves all rides taken by a specific user")
    @ApiResponse(responseCode = "200", description = "User rides retrieved successfully")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RideResponse>> ridesForUser(@PathVariable String userId) {
        return ResponseEntity.ok(rideService.getRidesForUser(userId));
    }

    // Admin: Get rides for a specific user filtered by status
    @Operation(summary = "Get rides for a user by status", description = "Retrieves rides for a specific user filtered by ride status")
    @ApiResponse(responseCode = "200", description = "Filtered user rides retrieved successfully")
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<RideResponse>> ridesForUserByStatus(
            @PathVariable String userId,
            @PathVariable Status status) {
        return ResponseEntity.ok(rideService.getRidesForUserByStatus(userId, status));
    }

    // Admin: Get active rides for a specific driver
    @Operation(summary = "Get active rides for a driver", description = "Retrieves all active rides assigned to a specific driver")
    @ApiResponse(responseCode = "200", description = "Active driver rides retrieved successfully")
    @GetMapping("/driver/{driverId}/active-rides")
    public ResponseEntity<List<RideResponse>> activeRidesForDriver(@PathVariable String driverId) {
        return ResponseEntity.ok(rideService.getActiveRidesForDriver(driverId));
    }

    // Admin: Filter rides by status and keyword
    @Operation(summary = "Filter rides by status and keyword", description = "Filter rides by status and optional pickup/drop location keyword")
    @ApiResponse(responseCode = "200", description = "Filtered rides retrieved successfully")
    @GetMapping("/filter-status")
    public ResponseEntity<List<RideResponse>> filterByStatusAndKeyword(
            @RequestParam("status") Status status,
            @RequestParam(value = "search", required = false) String search) {
        return ResponseEntity.ok(toResponses(rideQueryService.filterByStatusAndKeyword(status, search)));
    }

    // Admin: Advanced search with pagination and sorting
    @Operation(summary = "Advanced ride search", description = "Perform advanced search with filters, sorting, and pagination")
    @ApiResponse(responseCode = "200", description = "Advanced search results retrieved successfully")
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
    @Operation(summary = "Get rides on a specific date", description = "Retrieves all rides created on a specific date")
    @ApiResponse(responseCode = "200", description = "Rides on specified date retrieved successfully")
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
