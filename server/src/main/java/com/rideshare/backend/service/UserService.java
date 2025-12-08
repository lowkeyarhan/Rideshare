package com.rideshare.backend.service;

import com.rideshare.backend.dto.UserLoginRequest;
import com.rideshare.backend.dto.UserRegisterRequest;
import com.rideshare.backend.mapper.UserMapper;
import com.rideshare.backend.model.User;
import com.rideshare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user; returns null if username already exists
    public User register(UserRegisterRequest request) {
        if (userRepository.usernameExists(request.getUsername())) {
            return null; // Username already exists
        }

        User user = UserMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.registerUser(user);
    }

    // Validate user credentials for login
    public User validateUserCredentials(UserLoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            return null; // User not found
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return null; // Password mismatch
        }
        return user;
    }

    // Find user by username (used internally by RideService)
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
