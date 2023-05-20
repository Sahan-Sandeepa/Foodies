package com.foodies.foodies_50.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;


import com.foodies.foodies_50.model.Comment;
import com.foodies.foodies_50.repository.CommentRepository;

@ComponentScan
@Service
public class CommentService {


    @Autowired
    private CommentRepository commentRepository;
   
    public List<Comment> getStorys() {
        return commentRepository.findAll();
      }
      
      
    
      public Comment addStory(Comment Story) {
        return commentRepository.save(Story);
      }
    
      public List<Comment> findAllStoryComments() {
        return commentRepository.findAll();
      }
    
      public List<Comment> findAllCommentsByUserId(String postId) {
        return commentRepository.findAllByUserId(postId);
      }
    
      public Comment getStoryByStoryId(String id) {
        return commentRepository.findById(id).get();
      }
    
      public Comment updateComment(String id, Comment Story) throws Exception {
        Optional<Comment> existingProduct = commentRepository.findById(id);
        if (existingProduct.isPresent()) {
            Comment updateStory = existingProduct.get();
          updateStory.setComment(Story.getComment());

          return commentRepository.save(updateStory);
        } else {
          try {
            throw new Exception("Story not found with id: " + id);
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
        return Story;
      }
    
      public String deleteStory(String id) {
        commentRepository.deleteById(id);
        return id + " Story deleted ";
      }
}