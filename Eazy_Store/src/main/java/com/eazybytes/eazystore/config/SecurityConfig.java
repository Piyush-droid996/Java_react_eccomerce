package com.eazybytes.eazystore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.eazybytes.eazystore.security.CustomUserDetailsService;
import com.eazybytes.eazystore.security.JwtAuthenticationFilter;
@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            CustomUserDetailsService customUserDetailsService,
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.customUserDetailsService = customUserDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService());

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

            	    .requestMatchers("/api/v1/auth/**").permitAll()

            	    // Swagger
            	    .requestMatchers(
            	            "/v3/api-docs/**",
            	            "/swagger-ui/**",
            	            "/swagger-ui.html"
            	    ).permitAll()
            	    // Product APIs
            	    .requestMatchers(HttpMethod.GET, "/api/v1/products/**")
            	        .hasAnyRole("USER", "ADMIN")

            	    .requestMatchers(HttpMethod.POST, "/api/v1/products/**")
            	        .hasRole("ADMIN")

            	    .requestMatchers(HttpMethod.PUT, "/api/v1/products/**")
            	        .hasRole("ADMIN")

            	    .requestMatchers(HttpMethod.DELETE, "/api/v1/products/**")
            	        .hasRole("ADMIN")
            	        
            	        
            	     //cart api
            	        .requestMatchers("/api/v1/cart/**")
            	        .hasAnyRole("USER", "ADMIN")
            	      //order api
            	        .requestMatchers("/api/v1/orders/**")
            	        .hasAnyRole("USER","ADMIN")

            	    // Category APIs
            	    .requestMatchers(HttpMethod.GET, "/api/v1/categories/**")
            	        .hasAnyRole("USER", "ADMIN")

            	    .requestMatchers(HttpMethod.POST, "/api/v1/categories/**")
            	        .hasRole("ADMIN")

            	    .requestMatchers(HttpMethod.PUT, "/api/v1/categories/**")
            	        .hasRole("ADMIN")

            	    .requestMatchers(HttpMethod.DELETE, "/api/v1/categories/**")
            	        .hasRole("ADMIN")

            	    .anyRequest().authenticated()
            	)
            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}