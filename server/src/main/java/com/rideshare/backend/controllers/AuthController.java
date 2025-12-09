package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.UserLoginRequest;
import com.rideshare.backend.dto.UserRegisterRequest;
import com.rideshare.backend.model.User;
import com.rideshare.backend.service.UserService;
import com.rideshare.backend.utils.JwtUtil;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterRequest request) {
        User user = userService.register(request);
        return ResponseEntity.ok(buildAuthBody(user));
    }

    // Login user and generate JWT token
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginRequest request) {
        Optional<User> user = userService.validateUserCredentials(request);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        return ResponseEntity.ok(buildAuthBody(user.get()));
    }

    // Helper method to build authentication response body
    private Map<String, Object> buildAuthBody(User user) {
        Map<String, Object> body = new HashMap<>();
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        body.put("token", token);
        body.put("id", user.getId());
        body.put("name", user.getName());
        body.put("username", user.getUsername());
        body.put("role", user.getRole());
        return body;
    }
}
