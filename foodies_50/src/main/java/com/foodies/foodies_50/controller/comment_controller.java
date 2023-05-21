package com.foodies.foodies_50.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.foodies.foodies_50.model.Comment;
import com.foodies.foodies_50.model.CommentWithPost;
import com.foodies.foodies_50.service.CommentService;

@RestController
@RequestMapping("/comment")
public class comment_controller {


    @Autowired
    private UserService userService;

    @Autowired
    private CommentService CommentService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createStory(@RequestBody Comment comment) {
   
      return CommentService.addStory(comment);
    }
  
    @GetMapping("/")
    public List<CommentWithPost> getComments() {
      List<Comment> Comments = CommentService.findAllStoryComments();
      List<CommentWithPost> modifiedComments = new ArrayList<>();
      for (int i = 0; i < Comments.size(); i++) {
        Comment Comment = Comments.get(i);
        if (Comment.getUserId() != null) {
          User userData = userService.getUserByUserId(Comments.get(i).getUserId());
          CommentWithPost CommentWithUser = new CommentWithPost(
            Comment.getId(),
            Comment.getComment(),
            Comment.getUserId(),
            Comment.getPostId(),
            userData.getUsername()
   
          );
          modifiedComments.add(CommentWithUser);
        } else {
            CommentWithPost CommentWithUser = new CommentWithPost();
          CommentWithUser.setId(Comment.getPostId());
          CommentWithUser.setComment(Comment.getComment());
          CommentWithUser.setPostId(Comment.getPostId());
          CommentWithUser.setUserId(Comment.getUserId());

        }
      }
      return modifiedComments;
    }
  
    @GetMapping("/current")
    public List<Comment> getUserComments(Principal principal) {
      return CommentService.findAllCommentsByUserId(principal.getName());
    }
  
    @GetMapping("/{CommentId}")
    public Comment getStory(@PathVariable String CommentId) {
      return CommentService.getStoryByStoryId(CommentId);
    }
  
    @PutMapping("/update/{id}")
    public ResponseEntity<Comment> updateComment(
      @PathVariable("id") String id,
      @RequestBody Comment Comment
    ) throws Exception {
      Comment updatedProduct = CommentService.updateComment(id, Comment);
      return ResponseEntity.ok(updatedProduct);
    }
  
    @DeleteMapping("/{id}")
    public String deleteStory(@PathVariable("id") String id) {
      return CommentService.deleteStory(id);
    }


 
}

