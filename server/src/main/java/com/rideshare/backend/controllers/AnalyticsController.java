package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.analytics.DriverSummaryResponse;
import com.rideshare.backend.dto.analytics.RidesPerDayResponse;
import com.rideshare.backend.dto.analytics.StatusSummaryResponse;
import com.rideshare.backend.dto.analytics.UserSpendingResponse;
import com.rideshare.backend.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
@Tag(name = "Analytics", description = "Platform analytics and reporting endpoints")
@SecurityRequirement(name = "Bearer Authentication")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // Get number of rides per day for the last month
    @Operation(summary = "Get rides per day", description = "Returns the number of rides per day for the last month")
    @ApiResponse(responseCode = "200", description = "Rides per day data retrieved successfully")
    @GetMapping("/rides-per-day")
    public ResponseEntity<List<RidesPerDayResponse>> ridesPerDay() {
        return ResponseEntity.ok(analyticsService.ridesPerDay());
    }

    // Get summary statistics for a specific driver
    @Operation(summary = "Get driver summary", description = "Returns summary statistics for a specific driver")
    @ApiResponse(responseCode = "200", description = "Driver summary retrieved successfully")
    @GetMapping("/driver/{driverId}/summary")
    public ResponseEntity<DriverSummaryResponse> driverSummary(
            @Parameter(description = "Driver ID", required = true) @PathVariable String driverId) {
        return ResponseEntity.ok(analyticsService.driverSummary(driverId));
    }

    // Get total earnings for a specific driver
    @Operation(summary = "Get driver earnings", description = "Returns total earnings for a specific driver")
    @ApiResponse(responseCode = "200", description = "Driver earnings retrieved successfully")
    @GetMapping("/driver/{driverId}/earnings")
    public ResponseEntity<Double> driverEarnings(
            @Parameter(description = "Driver ID", required = true) @PathVariable String driverId) {
        return ResponseEntity.ok(analyticsService.driverEarnings(driverId));
    }

    // Get total spending for a specific user
    @Operation(summary = "Get user spending", description = "Returns total spending for a specific user")
    @ApiResponse(responseCode = "200", description = "User spending retrieved successfully")
    @GetMapping("/user/{userId}/spending")
    public ResponseEntity<UserSpendingResponse> userSpending(
            @Parameter(description = "User ID", required = true) @PathVariable String userId) {
        return ResponseEntity.ok(analyticsService.userSpending(userId));
    }

    // Get summary of rides by status
    @Operation(summary = "Get status summary", description = "Returns summary of all rides grouped by status")
    @ApiResponse(responseCode = "200", description = "Status summary retrieved successfully")
    @GetMapping("/status-summary")
    public ResponseEntity<List<StatusSummaryResponse>> statusSummary() {
        return ResponseEntity.ok(analyticsService.statusSummary());
    }
}
