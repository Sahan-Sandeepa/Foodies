package com.foodies.foodies_50.controller;

import com.foodies.foodies_50.model.Post;
import com.foodies.foodies_50.model.PostWithUser;
import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.service.PostService;
import com.foodies.foodies_50.service.UserService;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
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
  public Post createStory(@RequestBody Post post, Principal principal) {
    post.setUserId(principal.getName());
    return postService.addStory(post);
  }

  @GetMapping("/")
  public List<PostWithUser> getPosts() {
    List<Post> posts = postService.findAllStoryPosts();
    List<PostWithUser> modifiedPosts = new ArrayList<>();
    for (int i = 0; i < posts.size(); i++) {
      Post post = posts.get(i);
      if (post.getUserId() != null) {
        User userData = userService.getUserByUserId(posts.get(i).getUserId());
        PostWithUser postWithUser = new PostWithUser(
          post.getid(),
          post.getPostImages(),
          post.getCaption(),
          post.getLocation(),
          post.getMood(),
          post.getUserId(),
          userData.getUsername(),
          userData.getImageUrl()
        );
        modifiedPosts.add(postWithUser);
      } else {
        PostWithUser postWithUser = new PostWithUser();
        postWithUser.setid(post.getUserId());
        postWithUser.setPostImages(post.getPostImages());
        postWithUser.setCaption(post.getCaption());
        postWithUser.setLocation(post.getLocation());
        postWithUser.setMood(post.getMood());
        postWithUser.setUserId(post.getUserId());
      }
    }
    return modifiedPosts;
  }

  @GetMapping("/current")
  public List<Post> getUserPosts(Principal principal) {
    return postService.findAllPostsByUserId(principal.getName());
  }

  @GetMapping("/{PostId}")
  public Post getStory(@PathVariable String PostId) {
    return postService.getStoryByStoryId(PostId);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<Post> updatePost(
    @PathVariable("id") String id,
    @RequestBody Post post
  ) throws Exception {
    Post updatedProduct = postService.updatePost(id, post);
    return ResponseEntity.ok(updatedProduct);
  }

  @DeleteMapping("/{id}")
  public String deleteStory(@PathVariable("id") String id) {
    return postService.deleteStory(id);
  }
}
