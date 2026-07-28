package com.eazybytes.eazystore.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.eazybytes.eazystore.dto.UserResponse;
import com.eazybytes.eazystore.service.UserService;

@RestController
@RequestMapping("/api/v1/admin/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{userId}/status")
    public UserResponse updateUserStatus(
            @PathVariable Long userId,
            @RequestParam Boolean enabled) {

        return userService.updateUserStatus(userId, enabled);
    }
}