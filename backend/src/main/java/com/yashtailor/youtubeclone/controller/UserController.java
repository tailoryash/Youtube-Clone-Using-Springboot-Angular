package com.yashtailor.youtubeclone.controller;

import com.yashtailor.youtubeclone.service.UserRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserRegistrationService userRegistrationService;

    @GetMapping("/register")
    public String register(Authentication authentication)
    {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        userRegistrationService.registerUser(jwt.getTokenValue());
        return "User Registration Successfully";
    }
}
