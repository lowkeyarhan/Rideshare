package com.rideshare.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UserLoginRequest {

    @NotBlank(message = "Username is mandatory")
    private String username;
    
    @NotBlank(message = "Password is mandatory")
    private String password;
}
