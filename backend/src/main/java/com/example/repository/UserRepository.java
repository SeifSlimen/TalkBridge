package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    // Find users by name
    List<User> findByName(String name);
    // Find users by email
    User findByEmail(String email);
    // Find all users with a name containing a substring (case-insensitive)
    List<User> findByNameContainingIgnoreCase(String name);
}
