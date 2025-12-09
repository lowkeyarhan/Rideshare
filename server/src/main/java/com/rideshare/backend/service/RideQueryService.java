package com.rideshare.backend.service;

import com.rideshare.backend.model.Ride;
import com.rideshare.backend.model.enums.Status;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class RideQueryService {

    @Autowired
    private final MongoTemplate mongoTemplate;

    public RideQueryService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    // Search rides by pickup or drop location keyword
    public List<Ride> searchByPickupOrDrop(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return Collections.emptyList();
        }
        Criteria pickup = Criteria.where("pickupLocation").regex(keyword, "i");
        Criteria drop = Criteria.where("dropLocation").regex(keyword, "i");
        Query query = Query.query(new Criteria().orOperator(pickup, drop));
        return mongoTemplate.find(query, Ride.class);
    }

    // Filter rides by distance range
    public List<Ride> filterByDistance(Double min, Double max) {
        if (min == null && max == null) {
            return Collections.emptyList();
        }
        double lowerBound = min == null ? 0 : min;
        double upperBound = max == null ? Double.MAX_VALUE : max;
        Query query = new Query();
        query.addCriteria(Criteria.where("distanceKm").gte(lowerBound).lte(upperBound));
        return mongoTemplate.find(query, Ride.class);
    }

    // Filter rides by date range
    public List<Ride> filterByDateRange(LocalDate start, LocalDate end) {
        if (start == null || end == null) {
            return Collections.emptyList();
        }
        Query query = new Query();
        query.addCriteria(Criteria.where("createdDate").gte(start).lte(end));
        return mongoTemplate.find(query, Ride.class);
    }

    // Sort rides by fare amount
    public List<Ride> sortByFare(Sort.Direction direction) {
        Sort.Direction safeDirection = direction == null ? Sort.Direction.ASC : direction;
        Query query = new Query().with(Sort.by(safeDirection, "fareAmount"));
        return mongoTemplate.find(query, Ride.class);
    }

    // Filter rides by status and keyword in pickup or drop location
    public List<Ride> filterByStatusAndKeyword(Status status, String keyword) {
        if (status == null) {
            return Collections.emptyList();
        }
        Query query = new Query();
        query.addCriteria(Criteria.where("status").is(status));
        if (keyword != null && !keyword.isBlank()) {
            Criteria pickup = Criteria.where("pickupLocation").regex(keyword, "i");
            Criteria drop = Criteria.where("dropLocation").regex(keyword, "i");
            query.addCriteria(new Criteria().orOperator(pickup, drop));
        }
        return mongoTemplate.find(query, Ride.class);
    }

    // Advanced search with pagination and sorting
    public Page<Ride> advancedSearch(String keyword,
            Status status,
            String sortField,
            Sort.Direction direction,
            int page,
            int size) {
        Query query = new Query();
        if (keyword != null && !keyword.isBlank()) {
            Criteria pickup = Criteria.where("pickupLocation").regex(keyword, "i");
            Criteria drop = Criteria.where("dropLocation").regex(keyword, "i");
            query.addCriteria(new Criteria().orOperator(pickup, drop));
        }
        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }
        int safePage = Math.max(page, 0);
        int safeSize = Math.max(size, 1);
        String sortProperty = (sortField == null || sortField.isBlank()) ? "fareAmount" : sortField;
        Sort.Direction safeDirection = direction == null ? Sort.Direction.ASC : direction;
        Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by(safeDirection, sortProperty));
        long total = mongoTemplate.count(query, Ride.class);
        List<Ride> rides = total == 0 ? Collections.emptyList() : mongoTemplate.find(query.with(pageable), Ride.class);
        return new PageImpl<>(rides, pageable, total);
    }

    // Get rides on a specific date
    public List<Ride> ridesOnDate(LocalDate date) {
        if (date == null) {
            return Collections.emptyList();
        }
        Query query = Query.query(Criteria.where("createdDate").is(date));
        return mongoTemplate.find(query, Ride.class);
    }
}
