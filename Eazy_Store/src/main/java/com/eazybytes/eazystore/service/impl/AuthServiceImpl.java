package com.eazybytes.eazystore.service.impl;

import java.time.Instant;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.eazybytes.eazystore.dto.LoginRequest;
import com.eazybytes.eazystore.dto.LoginResponse;
import com.eazybytes.eazystore.dto.RegisterRequest;
import com.eazybytes.eazystore.entity.User;
import com.eazybytes.eazystore.exception.EmailAlreadyExistsException;
import com.eazybytes.eazystore.repository.UserRepository;
import com.eazybytes.eazystore.security.JwtService;
import com.eazybytes.eazystore.service.IAuthService;

@Service
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtservice;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager,JwtService jwtservice) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtservice=jwtservice;
    }

    @Override
    public String register(RegisterRequest request) {

    	if (userRepository.existsByEmail(request.getEmail())) {
    	    throw new EmailAlreadyExistsException("Email already registered");
    	}

    	User user = new User();

    	user.setFirstName(request.getFirstName());
    	user.setLastName(request.getLastName());
    	user.setEmail(request.getEmail());
    	user.setPassword(passwordEncoder.encode(request.getPassword()));
    	user.setRole("USER");
    	user.setEnabled(true);
    	user.setCreatedAt(Instant.now());

    	userRepository.save(user);

    	return "User Registered Successfully";
    }

    @Override

    public LoginResponse login(LoginRequest request) {
    	
    	authenticationManager.authenticate(
    	        new UsernamePasswordAuthenticationToken(
    	                request.getEmail(),
    	                request.getPassword()
    	        )
    	);

    	String token = jwtservice.generateToken(request.getEmail());

    	return new LoginResponse(
    	        "Login Successful",
    	        token
    	);
    	
//    	authenticationManager.authenticate(
//    	        new UsernamePasswordAuthenticationToken(
//    	                request.getEmail(),
//    	                request.getPassword()
//    	        )
//    	);
//
//    	return new LoginResponse(
//    	        "Login Successful",
//    	        "JWT Token will be generated later"
//    	);
    		
//        // Find user by email
//    	User user = userRepository.findByEmail(request.getEmail())
//    	        .orElseThrow(() ->
//    	                new UserNotFoundException("User not found"));
//
//    	if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//    	    throw new InvalidPasswordException("Invalid Password");
//    	}
//
//    	return new LoginResponse(
//    	        "Login Successful",
//    	        "JWT Token will be generated later"
//    	);
    
    }
}