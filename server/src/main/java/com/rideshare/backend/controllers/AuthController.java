package com.rideshare.backend.controllers;

import com.rideshare.backend.dto.UserLoginRequest;
import com.rideshare.backend.dto.UserRegisterRequest;
import com.rideshare.backend.model.User;
import com.rideshare.backend.service.UserService;
import com.rideshare.backend.utils.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Register a new user
    @Operation(summary = "Register a new user", description = "Creates a new user account with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content)
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterRequest request) {
        User user = userService.register(request);
        return ResponseEntity.ok(buildAuthBody(user));
    }

    // Login user and generate JWT token
    @Operation(summary = "User login", description = "Authenticates user credentials and returns JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content)
    })
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
