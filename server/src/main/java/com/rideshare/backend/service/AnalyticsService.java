package com.rideshare.backend.service;

import com.rideshare.backend.dto.analytics.DriverSummaryResponse;
import com.rideshare.backend.dto.analytics.RidesPerDayResponse;
import com.rideshare.backend.dto.analytics.StatusSummaryResponse;
import com.rideshare.backend.dto.analytics.UserSpendingResponse;
import com.rideshare.backend.model.enums.Status;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    @Autowired
    private final MongoTemplate mongoTemplate;

    // Constructor
    public AnalyticsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<RidesPerDayResponse> ridesPerDay() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("createdDate").count().as("rideCount"),
                Aggregation.project("rideCount").and("_id").as("date"),
                Aggregation.sort(Sort.Direction.ASC, "date"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "rides", Document.class);
        return results.getMappedResults().stream()
                .map(doc -> new RidesPerDayResponse(toLocalDate(doc.get("date")), getLong(doc, "rideCount")))
                .toList();
    }

    public DriverSummaryResponse driverSummary(String driverId) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("driverId").is(driverId)),
                Aggregation.group("driverId")
                        .count().as("totalRides")
                        .sum(ConditionalOperators.when(Criteria.where("status").is(Status.COMPLETED)).then(1)
                                .otherwise(0))
                        .as("completedRides")
                        .sum(ConditionalOperators.when(Criteria.where("status").is(Status.ACCEPTED)).then(1)
                                .otherwise(0))
                        .as("acceptedRides")
                        .avg("distanceKm").as("avgDistance")
                        .sum("fareAmount").as("totalFare"),
                Aggregation.project("totalRides", "completedRides", "acceptedRides", "avgDistance", "totalFare")
                        .and("_id").as("driverId"));

        Document doc = mongoTemplate.aggregate(aggregation, "rides", Document.class).getUniqueMappedResult();
        if (doc == null) {
            return new DriverSummaryResponse(driverId, 0, 0, 0, 0, 0);
        }
        return new DriverSummaryResponse(
                doc.getString("driverId"),
                getLong(doc, "totalRides"),
                getLong(doc, "completedRides"),
                getLong(doc, "acceptedRides"),
                getDouble(doc, "avgDistance"),
                getDouble(doc, "totalFare"));
    }

    public UserSpendingResponse userSpending(String userId) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("userId").is(userId)
                        .and("status").is(Status.COMPLETED)),
                Aggregation.group("userId")
                        .sum("fareAmount").as("totalFare")
                        .count().as("completedRides"),
                Aggregation.project("totalFare", "completedRides").and("_id").as("userId"));

        Document doc = mongoTemplate.aggregate(aggregation, "rides", Document.class).getUniqueMappedResult();
        if (doc == null) {
            return new UserSpendingResponse(userId, 0, 0);
        }
        return new UserSpendingResponse(
                doc.getString("userId"),
                getDouble(doc, "totalFare"),
                getLong(doc, "completedRides"));
    }

    public List<StatusSummaryResponse> statusSummary() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("status").count().as("count"),
                Aggregation.project("count").and("_id").as("status"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "rides", Document.class);
        if (results.getMappedResults().isEmpty()) {
            return Collections.emptyList();
        }
        return results.getMappedResults().stream()
                .map(doc -> new StatusSummaryResponse(toStatus(doc.getString("status")), getLong(doc, "count")))
                .toList();
    }

    public double driverEarnings(String driverId) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("driverId").is(driverId)
                        .and("status").is(Status.COMPLETED)),
                Aggregation.group("driverId").sum("fareAmount").as("totalFare"));

        Document doc = mongoTemplate.aggregate(aggregation, "rides", Document.class).getUniqueMappedResult();
        return doc == null ? 0 : getDouble(doc, "totalFare");
    }

    private LocalDate toLocalDate(Object value) {
        if (value instanceof LocalDate localDate) {
            return localDate;
        }
        if (value instanceof Instant instant) {
            return instant.atZone(ZoneId.systemDefault()).toLocalDate();
        }
        if (value instanceof java.util.Date date) {
            return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }
        return null;
    }

    private long getLong(Document doc, String key) {
        Number number = doc.get(key, Number.class);
        return number == null ? 0 : number.longValue();
    }

    private double getDouble(Document doc, String key) {
        Number number = doc.get(key, Number.class);
        return number == null ? 0 : number.doubleValue();
    }

    private Status toStatus(String value) {
        return Objects.nonNull(value) ? Status.valueOf(value) : null;
    }
}
