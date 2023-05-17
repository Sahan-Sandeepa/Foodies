package com.foodies.foodies_50.controller;

import com.foodies.foodies_50.model.Post;
import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.service.PostService;

import java.security.Principal;
import java.util.List;

import com.foodies.foodies_50.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/post")
public class post_Controller {

  @Autowired
  private PostService postService;



  @Autowired
  private UserService userService;
  @PostMapping("/create")
  @ResponseStatus(HttpStatus.CREATED)
  public Post createStory(@RequestBody Post post, Principal principal)
  {
    String userId = principal.getName();
    User user = userService.getUserByUserId(userId);
    post.setUser(user);
    return postService.addStory(post);
  }

  @GetMapping("/")
  public List<Post> getPosts() {
    return postService.findAllStoryPosts();
  }

  @GetMapping("/{id}")
  public Post getStory(@PathVariable String id) {
    return postService.getStoryByStoryId(id);
  }

  @PutMapping("/new/{id}")
  public ResponseEntity<Post> updatePost(
    @PathVariable("id") String id,
    @RequestBody Post post
  ) throws Exception {
    Post updatedProduct = postService.updatePost(id, post);
    return ResponseEntity.ok(updatedProduct);
  }

  @DeleteMapping("/{PostId}")
  public String deleteStory(@PathVariable String PostId) {
    return postService.deleteStory(PostId);
  }
}
