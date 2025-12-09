package com.rideshare.backend.dto.analytics;

import com.rideshare.backend.model.enums.Status;

public class StatusSummaryResponse {

    private Status status;
    private long count;

    public StatusSummaryResponse(Status status, long count) {
        this.status = status;
        this.count = count;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
