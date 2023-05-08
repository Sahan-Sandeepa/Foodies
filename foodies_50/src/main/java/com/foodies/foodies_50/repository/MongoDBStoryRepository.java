package com.foodies.foodies_50.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.foodies.foodies_50.model.Story;

@Repository
public interface MongoDBStoryRepository extends MongoRepository<Story, String> {
    
    Optional<Story> findById(String id);
    
    void deleteById(String id);
}
