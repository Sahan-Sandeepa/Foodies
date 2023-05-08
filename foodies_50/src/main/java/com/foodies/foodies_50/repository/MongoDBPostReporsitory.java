package com.foodies.foodies_50.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.foodies.foodies_50.model.Post;

@Repository

public interface MongoDBPostReporsitory extends MongoRepository<Post, String>{

    
}
