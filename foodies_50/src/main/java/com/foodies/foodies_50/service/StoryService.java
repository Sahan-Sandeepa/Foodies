package com.foodies.foodies_50.service;

import com.foodies.foodies_50.model.*;
import com.foodies.foodies_50.repository.MongoDBStoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;


@ComponentScan
@Service

public class StoryService {
    @Autowired
    private MongoDBStoryRepository storyRepository;

    // public Optional<Story> getStoryById(String id) {
    //     // Fetch the Story from the repository by ID
    //     Optional<Story> Story = storyRepository.findById(id);

    //     // Return the fetched Story, or an empty Optional if not found
    //     return Story;
    // }
    // public List<Story> getAllpost() {
    //     return storyRepository.findAll();
    // }

   
    // public Optional<Story> getstoryById(Long id) {
    //     return storyRepository.findById(id);
    // }

    // @Field("caption")

    // public String addPhoto(String caption, MultipartFile file) throws IOException {
    //     Story story = new Story();
    //     story.setImage(
    //             new Binary(BsonBinarySubType.BINARY, file.getBytes()));
    //     story.setCaption(caption);
    //     story = storyRepository.insert(story);
    //     return story.getId();
    // }

    public List<Story> getAlluser() {
        return storyRepository.findAll();
    }


    public Story addStory(Story Story) {
        Story.setid(UUID.randomUUID().toString().split("-")[0]);
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
