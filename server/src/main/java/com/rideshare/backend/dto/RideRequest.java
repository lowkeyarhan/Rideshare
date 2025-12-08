package com.rideshare.backend.dto;

import com.rideshare.backend.model.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RideRequest {

    @NotBlank(message = "User id is mandatory")
    private String userId;

    private String driverId;

    @NotBlank(message = "Pickup location is mandatory")
    private String pickupLocation;

    @NotBlank(message = "Drop location is mandatory")
    private String dropLocation;

    @NotNull(message = "Status is mandatory")
    private Status status;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropLocation() {
        return dropLocation;
    }

    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
