package com.rideshare.backend.repository;

import com.rideshare.backend.model.enums.Status;
import java.util.List;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.rideshare.backend.model.Ride;

@Repository
public class RideRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    // user requests a ride (create ride)
    public Ride requestRide(Ride ride) {
        return mongoTemplate.save(ride);
    }

    // user views rides taken by them (user ride history)
    public List<Ride> getRidesByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        return mongoTemplate.find(query, Ride.class);
    }

    // driver views pending ride requests (rides with status 'REQUESTED')
    public List<Ride> getPendingRides() {
        Query query = new Query();
        query.addCriteria(Criteria.where("status").is(Status.REQUESTED));
        return mongoTemplate.find(query, Ride.class);
    }

    // driver accepts/completes a ride (update ride status and assign driverId)
    public Ride updateRide(Ride ride) {
        return mongoTemplate.save(ride);
    }

    // driver views rides completed by them (driver ride history)
    public List<Ride> getRidesByDriverId(String driverId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("driverId").is(driverId));
        return mongoTemplate.find(query, Ride.class);
    }

    // get available rides (REQUESTED status with no driver)
    public List<Ride> getAvailableRides() {
        Query query = new Query();
        query.addCriteria(Criteria.where("status").is(Status.REQUESTED)
                .and("driverId").exists(false));
        return mongoTemplate.find(query, Ride.class);
    }

    // get a single ride by ID
    public Ride getRideById(String rideId) {
        return mongoTemplate.findById(rideId, Ride.class);
    }
}
