package com.rideshare.backend.repository;

import java.util.List;

import com.rideshare.backend.model.enums.Role;
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

    // get all users
    public List<User> getAllUsers() {
        return mongoTemplate.findAll(User.class);
    }

    // get users by role
    public List<User> getUsersByRole(String role) {
        Query query = new Query();
        query.addCriteria(Criteria.where("role").is(Role.valueOf(role)));
        return mongoTemplate.find(query, User.class);
    }

    // find user by id
    public User findUserById(String id) {
        return mongoTemplate.findById(id, User.class);
    }

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