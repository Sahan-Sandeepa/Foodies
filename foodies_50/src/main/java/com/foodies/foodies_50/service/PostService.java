package com.foodies.foodies_50.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodies.foodies_50.model.Post;
import com.foodies.foodies_50.repository.MongoDBPostReporsitory;

@Service
public class PostService {
    @Autowired
    private MongoDBPostReporsitory postRepository;

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post addStory(Post post) {
        post.setid(UUID.randomUUID().toString().split("-")[0]);
        return postRepository.save(post);
    }

    public List<Post> findAllStoryPosts() {
        return postRepository.findAll();
    }

    public Post getStoryByStoryId(String PostId) {
        return postRepository.findById(PostId).get();
    }

    public Post updatePost(String id, Post post) throws Exception {
        Optional<Post> existingProduct = postRepository.findById(id);
        if (existingProduct.isPresent()) {
            Post updatePost = existingProduct.get();
            updatePost.setCaption(post.getCaption());
            updatePost.setLocation(post.getLocation());
            updatePost.setMood(post.getMood());
            updatePost.setPostImages(post.getPostImages());
            return postRepository.save(updatePost);
        } else {
            try {
                throw new Exception("Story not found with id: " + id);
            } catch (Exception e) {
                // TODO Auto-generated catch block
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
