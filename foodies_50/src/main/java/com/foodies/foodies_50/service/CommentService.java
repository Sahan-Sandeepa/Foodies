package com.foodies.foodies_50.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;


import com.foodies.foodies_50.model.Comment;
import com.foodies.foodies_50.repository.CommentRepository;
import com.foodies.foodies_50.security.EntityNotFoundException;

@ComponentScan
@Service
public class CommentService {


    @Autowired
    private CommentRepository commentRepository;
    public Comment addComment(Comment Comment) {
        return commentRepository.save(Comment);
    }

    public List<Comment> findAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentByCommentId(String CommentId){
        return commentRepository.findById(CommentId).get();
    }


    public Comment updateComment(String id, Comment CommentRequest){
        //get the existing document from DB
        // populate new value from request to existing object/entity/document

        Optional<Comment> existingProduct = commentRepository.findById(id);
        if (existingProduct.isPresent()) {
             Comment updateStory = existingProduct.get();
            updateStory.setComment(CommentRequest.getComment());
            updateStory.setCommentedBy(CommentRequest.getCommentedBy());
            updateStory.setCommentedAt(CommentRequest.getCommentedAt());

             return commentRepository.save(updateStory);
        }
         
         throw new EntityNotFoundException("Comment not found with id: " + id);

    }

     public String deleteComment(String CommentId) {
        commentRepository.deleteById(CommentId);
        return CommentId + " Post deleted ";
    }
}