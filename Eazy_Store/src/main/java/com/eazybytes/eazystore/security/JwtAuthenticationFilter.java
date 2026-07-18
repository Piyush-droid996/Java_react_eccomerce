package com.eazybytes.eazystore.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Read Authorization Header
        final String authHeader = request.getHeader("Authorization");

        // If Authorization header is missing, continue request
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Remove "Bearer "
        String jwt = authHeader.substring(7);

        // Extract email from JWT
        String username = jwtService.extractUsername(jwt);

        // Load user from database
        if (username != null) {

        	UserDetails userDetails =
        	        userDetailsService.loadUserByUsername(username);

        	if (jwtService.isTokenValid(jwt, userDetails)) {

        	    UsernamePasswordAuthenticationToken authentication =
        	            new UsernamePasswordAuthenticationToken(
        	                    userDetails,
        	                    null,
        	                    userDetails.getAuthorities()
        	            );

        	    SecurityContextHolder.getContext()
        	            .setAuthentication(authentication);
        	}

            // JWT validation and SecurityContext will be added next
        }

        filterChain.doFilter(request, response);
    }
}