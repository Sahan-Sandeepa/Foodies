package com.foodies.foodies_50.service;

import com.foodies.foodies_50.model.*;
import com.foodies.foodies_50.repository.MongoDBStoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


@ComponentScan
@Service

public class StoryService {
    @Autowired
    private MongoDBStoryRepository storyRepository;

    public List<Story> getStorys() {
        return storyRepository.findAll();
      }
    
      public Story addStory(Story Story) {
        return storyRepository.save(Story);
      }
    
      public List<Story> findAllStoryStorys() {
        return storyRepository.findAll();
      }
    
      public List<Story> findAllStorysByUserId(String userId) {
        return storyRepository.findAllByUserId(userId);
      }
    
      public Story getStoryByStoryId(String id) {
        return storyRepository.findById(id).get();
      }
    
      public Story updateStory(String id, Story Story) throws Exception {
        Optional<Story> existingProduct = storyRepository.findById(id);
        if (existingProduct.isPresent()) {
          Story updateStory = existingProduct.get();
          updateStory.setCaption(Story.getCaption());;
          return storyRepository.save(updateStory);
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
        storyRepository.deleteById(id);
        return id + " Story deleted ";
      }
    }
