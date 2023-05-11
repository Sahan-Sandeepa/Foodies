package com.foodies.foodies_50.controller;

import java.security.Principal;
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
import com.foodies.foodies_50.service.CommentService;

@RestController
@RequestMapping("/comment")
public class comment_controller {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createComment(@RequestBody Comment comment, Principal principal){
        String userId = principal.getName();
        User user = userService.getUserByUserId(userId);
        comment.setUser(user);
        return commentService.addComment(comment);
    }

    @GetMapping
    public List<Comment> getComments() {
        return commentService.findAllComments();
    }


    @GetMapping("/{CommentId}")
    public Comment getComment(@PathVariable String CommentId){
        return commentService.getCommentByCommentId(CommentId);
    }

    

//    @PutMapping("/new/{id}")
//     public Comment modifyComment(@RequestBody Comment Comment){
//         return commentService.updateComment(Comment);
//     }

@PutMapping("/new/{id}")
public ResponseEntity<Comment>updateComment(@PathVariable("id") String id, @RequestBody Comment post){
    Comment updatedProduct = commentService.updateComment(id, post);
    return ResponseEntity.ok(updatedProduct);
}

    @DeleteMapping("/{CommentId}")
    public String deleteComment(@PathVariable String CommentId){
        return commentService.deleteComment(CommentId);
    }
}

