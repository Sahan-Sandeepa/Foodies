package com.foodies.foodies_50.repository;

import com.foodies.foodies_50.model.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoDBUserRepository extends MongoRepository<User, String> {
  Optional<User> findById(String id);
  void deleteById(String id);
}
