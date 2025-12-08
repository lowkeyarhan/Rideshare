package com.rideshare.backend.service;

import com.rideshare.backend.dto.UserLoginRequest;
import com.rideshare.backend.dto.UserRegisterRequest;
import com.rideshare.backend.mapper.UserMapper;
import com.rideshare.backend.model.User;
import com.rideshare.backend.repository.UserRepository;
import java.util.List;
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

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    // Get users by role (e.g., "RIDER", "DRIVER", "ADMIN")
    public List<User> getUsersByRole(String role) {
        return userRepository.getUsersByRole(role);
    }

    // Find user by ID
    public User findUserById(String id) {
        return userRepository.findUserById(id);
    }

    // Find user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Check if username already exists
    public boolean usernameExists(String username) {
        return userRepository.usernameExists(username);
    }

    // Update/save user
    public User saveUser(User user) {
        return userRepository.registerUser(user);
    }
}
