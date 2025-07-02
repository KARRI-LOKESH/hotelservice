package com.hotel.hotel_service.controller;

import com.hotel.hotel_service.model.User;
import com.hotel.hotel_service.repository.UserRepository;
import com.hotel.hotel_service.dto.LoginRequest;
import com.hotel.hotel_service.dto.RegisterRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")  // better CORS setup
public class AuthController {

    @Autowired
    private UserRepository userRepo;
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
    Optional<User> existingUser = userRepo.findByEmail(registerRequest.getEmail());

    if (existingUser.isPresent()) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
    }

    User newUser = new User();
    newUser.setEmail(registerRequest.getEmail());
    newUser.setPassword(registerRequest.getPassword());  // ❗ In production, hash the password

    userRepo.save(newUser);

    return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepo.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok(user);
    }
    
}
