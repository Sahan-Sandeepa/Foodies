package com.foodies.foodies_50.service;

import com.foodies.foodies_50.model.*;
import com.foodies.foodies_50.repository.MongoDBStoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;

import org.springframework.stereotype.Service;


@ComponentScan
@Service

public class StoryService {
    @Autowired
    private MongoDBStoryRepository storyRepository;

    public List<Story> getAlluser() {
        return storyRepository.findAll();
    }


    public Story addStory(Story Story) {
        return storyRepository.save(Story);
    }

    public List<Story> findAllStorys() {
        return storyRepository.findAll();
    }

    public Story getStoryByStoryId(String StoryId){
        return storyRepository.findById(StoryId).get();
    }


    public Story updateStory(Story StoryRequest){
        //get the existing document from DB
        // populate new value from request to existing object/entity/document
        Story existingStory = storyRepository.findById(StoryRequest.getid()).get();
        existingStory.setCaption(StoryRequest.getCaption());
        existingStory.setImage(StoryRequest.getImage());
        return storyRepository.save(existingStory);
    }

    public String deleteStory(String StoryId){
        storyRepository.deleteById(StoryId);
        return StoryId+" Story deleted ";
    }

   
    

}
