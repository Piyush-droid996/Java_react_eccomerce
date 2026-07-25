package com.eazybytes.eazystore.service;

import java.util.List;

import com.eazybytes.eazystore.dto.UserResponse;
import com.eazybytes.eazystore.dto.UserStatusRequest;

public interface UserService {

    List<UserResponse> getAllUsers();
    UserResponse updateUserStatus(Long userId, Boolean enabled);

}