package com.rideshare.backend.repository;

import com.rideshare.backend.model.Ride;
import com.rideshare.backend.model.enums.Status;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RideRepository extends MongoRepository<Ride, String> {
    // Find rides by user ID
    List<Ride> findByUserId(String userId);

    // Find rides by user ID and status
    List<Ride> findByUserIdAndStatus(String userId, Status status);

    // Find rides by driver ID
    List<Ride> findByDriverId(String driverId);

    // Find rides by driver ID and status
    List<Ride> findByDriverIdAndStatus(String driverId, Status status);

    // Find rides by status
    List<Ride> findByStatus(Status status);

    // Find rides by creation date
    List<Ride> findByCreatedDate(LocalDate createdDate);
}
