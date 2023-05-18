package com.foodies.foodies_50.repository;

import com.foodies.foodies_50.model.Post;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoDBPostReporsitory extends MongoRepository<Post, String> {
  List<Post> findAllByUserId(String userId);
}
