package com.rideshare.backend.dto.analytics;

public class UserSpendingResponse {

    private String userId;
    private double totalFare;
    private long completedRides;

    public UserSpendingResponse(String userId, double totalFare, long completedRides) {
        this.userId = userId;
        this.totalFare = totalFare;
        this.completedRides = completedRides;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getTotalFare() {
        return totalFare;
    }

    public void setTotalFare(double totalFare) {
        this.totalFare = totalFare;
    }

    public long getCompletedRides() {
        return completedRides;
    }

    public void setCompletedRides(long completedRides) {
        this.completedRides = completedRides;
    }
}
