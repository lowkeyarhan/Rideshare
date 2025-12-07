package com.rideshare.backend.dto;

import javax.management.relation.Role;

import jakarta.validation.constraints.NotBlank;

public class UserRegisterRequest {

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @NotBlank(message = "Role is mandatory")
    private Role role;
}
