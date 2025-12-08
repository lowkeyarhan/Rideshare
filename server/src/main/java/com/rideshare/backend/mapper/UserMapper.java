package com.rideshare.backend.mapper;

import com.rideshare.backend.dto.UserRegisterRequest;
import com.rideshare.backend.dto.UserResponse;
import com.rideshare.backend.model.User;

public class UserMapper {

    private UserMapper() {
    }

    public static User toEntity(UserRegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());
        return user;
    }

    public static UserResponse toResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        return response;
    }
}
