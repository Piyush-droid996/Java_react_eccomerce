package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.LoginRequest;
import com.eazybytes.eazystore.dto.LoginResponse;
import com.eazybytes.eazystore.dto.RegisterRequest;

public interface IAuthService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}