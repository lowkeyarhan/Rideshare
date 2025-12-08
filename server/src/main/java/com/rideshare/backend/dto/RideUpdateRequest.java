package com.rideshare.backend.dto;

import com.rideshare.backend.model.enums.Status;

public class RideUpdateRequest {
    private String driverId;
    private Status status;

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
