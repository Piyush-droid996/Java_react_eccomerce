package com.eazybytes.eazystore.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eazybytes.eazystore.dto.UserResponse;
import com.eazybytes.eazystore.dto.UserStatusRequest;
import com.eazybytes.eazystore.entity.User;
import com.eazybytes.eazystore.repository.UserRepository;
import com.eazybytes.eazystore.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    
    @Override
    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {

            UserResponse response = new UserResponse();

            response.setUserId(user.getId());
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setEmail(user.getEmail());
            response.setRole(user.getRole());      // ✅ Fixed
            response.setEnabled(user.getEnabled());

            return response;

        }).toList();
    }
    
    @Override
    public UserResponse updateUserStatus(Long userId, Boolean enabled) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setEnabled(enabled);

        User updatedUser = userRepository.save(user);

        UserResponse response = new UserResponse();

        response.setUserId(updatedUser.getId());
        response.setFirstName(updatedUser.getFirstName());
        response.setLastName(updatedUser.getLastName());
        response.setEmail(updatedUser.getEmail());
        response.setRole(updatedUser.getRole());
        response.setEnabled(updatedUser.getEnabled());

        return response;
    }
}