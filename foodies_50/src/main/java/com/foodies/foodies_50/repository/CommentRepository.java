package com.foodies.foodies_50.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.foodies.foodies_50.model.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

    List<Comment> findAllByUserId(String postId);

    void deleteById(String id);

}
