package com.foodies.foodies_50.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.foodies.foodies_50.model.Story;
import com.foodies.foodies_50.service.*;
import java.util.List;
import org.springframework.http.HttpStatus;

@CrossOrigin
@RestController
@RequestMapping("/story")
public class story_Controller {

    @Autowired
    private StoryService storyService;
 

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Story createStory(@RequestBody Story Story){
        return storyService.addStory(Story);
    }

    @GetMapping("/")
    public List<Story> getStoryList() {
        return storyService.findAllStorys();
    }


    @GetMapping("/{StoryId}")
    public Story getStory(@PathVariable String StoryId){
        return storyService.getStoryByStoryId(StoryId);
    }

    

    @PutMapping("/{StoryId}")
    public Story modifyStory(@RequestBody Story Story){
        return storyService.updateStory(Story);
    }

    @DeleteMapping("/{StoryId}")
    public String deleteStory(@PathVariable String StoryId){
        return storyService.deleteStory(StoryId);
    }
 
}
