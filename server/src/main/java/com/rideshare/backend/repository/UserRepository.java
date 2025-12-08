package com.rideshare.backend.repository;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import com.rideshare.backend.model.User;

@Repository
public class UserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    // register/add/update a user
    public User registerUser(User user) {
        return mongoTemplate.save(user);

    }

    // find user by username
    public User findByUsername(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        return mongoTemplate.findOne(query, User.class);
    }

    // check if username already exists in the db (for registration validation)
    public boolean usernameExists(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(username));
        return mongoTemplate.exists(query, User.class);
    }
}