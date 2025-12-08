package com.rideshare.backend.mapper;

import com.rideshare.backend.dto.UserRegisterRequest;
import com.rideshare.backend.model.User;

public class UserMapper {

    private UserMapper() {
    }

    // client to server
    public static User toEntity(UserRegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());
        return user;
    }
}
