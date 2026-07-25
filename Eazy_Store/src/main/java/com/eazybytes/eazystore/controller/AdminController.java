package com.eazybytes.eazystore.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eazybytes.eazystore.dto.DashboardResponse;
import com.eazybytes.eazystore.dto.UserResponse;
import com.eazybytes.eazystore.dto.UserStatusRequest;
import com.eazybytes.eazystore.service.DashboardService;
import com.eazybytes.eazystore.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final DashboardService dashboardService;
    private final UserService userService;

    public AdminController(DashboardService dashboardService,
                           UserService userService) {
        this.dashboardService = dashboardService;
        this.userService = userService;
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }

  
    
   
}