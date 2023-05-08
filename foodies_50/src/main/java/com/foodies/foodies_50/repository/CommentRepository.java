package com.foodies.foodies_50.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.foodies.foodies_50.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {


}
