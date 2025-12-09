package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.analytics.DriverSummaryResponse;
import com.rideshare.backend.dto.analytics.RidesPerDayResponse;
import com.rideshare.backend.dto.analytics.StatusSummaryResponse;
import com.rideshare.backend.dto.analytics.UserSpendingResponse;
import com.rideshare.backend.service.AnalyticsService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // Get number of rides per day for the last month
    @GetMapping("/rides-per-day")
    public ResponseEntity<List<RidesPerDayResponse>> ridesPerDay() {
        return ResponseEntity.ok(analyticsService.ridesPerDay());
    }

    // Get summary statistics for a specific driver
    @GetMapping("/driver/{driverId}/summary")
    public ResponseEntity<DriverSummaryResponse> driverSummary(@PathVariable String driverId) {
        return ResponseEntity.ok(analyticsService.driverSummary(driverId));
    }

    // Get total earnings for a specific driver
    @GetMapping("/driver/{driverId}/earnings")
    public ResponseEntity<Double> driverEarnings(@PathVariable String driverId) {
        return ResponseEntity.ok(analyticsService.driverEarnings(driverId));
    }

    // Get total spending for a specific user
    @GetMapping("/user/{userId}/spending")
    public ResponseEntity<UserSpendingResponse> userSpending(@PathVariable String userId) {
        return ResponseEntity.ok(analyticsService.userSpending(userId));
    }

    // Get summary of rides by status
    @GetMapping("/status-summary")
    public ResponseEntity<List<StatusSummaryResponse>> statusSummary() {
        return ResponseEntity.ok(analyticsService.statusSummary());
    }
}
