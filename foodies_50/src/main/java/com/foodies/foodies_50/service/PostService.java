package com.foodies.foodies_50.service;

import com.foodies.foodies_50.model.Post;
import com.foodies.foodies_50.repository.MongoDBPostReporsitory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

  @Autowired
  private MongoDBPostReporsitory postRepository;

  public List<Post> getPosts() {
    return postRepository.findAll();
  }

  public Post addStory(Post post) {
    return postRepository.save(post);
  }

  public List<Post> findAllStoryPosts() {
    return postRepository.findAll();
  }

  public List<Post> findAllPostsByUserId(String userId) {
    return postRepository.findAllByUserId(userId);
  }

  public Post getStoryByStoryId(String id) {
    return postRepository.findById(id).get();
  }

  public Post updatePost(String id, Post post) throws Exception {
    Optional<Post> existingProduct = postRepository.findById(id);
    if (existingProduct.isPresent()) {
      Post updatePost = existingProduct.get();
      updatePost.setCaption(post.getCaption());
      updatePost.setLocation(post.getLocation());
      updatePost.setMood(post.getMood());
      return postRepository.save(updatePost);
    } else {
      try {
        throw new Exception("Story not found with id: " + id);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return post;
  }

  public String deleteStory(String StoryId) {
    postRepository.deleteById(StoryId);
    return StoryId + " Post deleted ";
  }
}
