package com.foodies.foodies_50.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.foodies.foodies_50.model.Story;

@Repository
public interface MongoDBStoryRepository extends MongoRepository<Story, String> {
    
    
    void deleteById(String id);

    List<Story> findAllByUserId(String userId);
}
