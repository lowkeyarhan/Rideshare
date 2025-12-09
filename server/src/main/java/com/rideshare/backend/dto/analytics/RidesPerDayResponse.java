package com.rideshare.backend.dto.analytics;

import java.time.LocalDate;

public class RidesPerDayResponse {

    private LocalDate date;
    private long rideCount;

    public RidesPerDayResponse(LocalDate date, long rideCount) {
        this.date = date;
        this.rideCount = rideCount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public long getRideCount() {
        return rideCount;
    }

    public void setRideCount(long rideCount) {
        this.rideCount = rideCount;
    }
}
