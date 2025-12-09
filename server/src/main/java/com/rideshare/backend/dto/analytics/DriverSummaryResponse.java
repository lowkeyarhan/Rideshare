package com.rideshare.backend.dto.analytics;

public class DriverSummaryResponse {

    private String driverId;
    private long totalRides;
    private long completedRides;
    private long acceptedRides;
    private double avgDistance;
    private double totalFare;

    public DriverSummaryResponse(String driverId,
            long totalRides,
            long completedRides,
            long acceptedRides,
            double avgDistance,
            double totalFare) {
        this.driverId = driverId;
        this.totalRides = totalRides;
        this.completedRides = completedRides;
        this.acceptedRides = acceptedRides;
        this.avgDistance = avgDistance;
        this.totalFare = totalFare;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public long getTotalRides() {
        return totalRides;
    }

    public void setTotalRides(long totalRides) {
        this.totalRides = totalRides;
    }

    public long getCompletedRides() {
        return completedRides;
    }

    public void setCompletedRides(long completedRides) {
        this.completedRides = completedRides;
    }

    public long getAcceptedRides() {
        return acceptedRides;
    }

    public void setAcceptedRides(long acceptedRides) {
        this.acceptedRides = acceptedRides;
    }

    public double getAvgDistance() {
        return avgDistance;
    }

    public void setAvgDistance(double avgDistance) {
        this.avgDistance = avgDistance;
    }

    public double getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(double totalFare) {
        this.totalFare = totalFare;
    }
}
