package com.foodies.foodies_50.controller;

import com.foodies.foodies_50.model.Story;
import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.service.StoryService;
import com.foodies.foodies_50.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/story")
public class story_Controller {

    @Autowired
    private StoryService storyService;
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Story createStory(@RequestBody Story story, Principal principal){
        String userId = principal.getName();
        User user = userService.getUserByUserId(userId);
        story.setUser(user);
        return storyService.addStory(story);
    }

    @GetMapping("/")
    public List<Story> getStoryList() {
        return storyService.findAllStorys();
    }


    @GetMapping("/{storyId}")
    public Story getStory(@PathVariable String storyId){
        return storyService.getStoryByStoryId(storyId);
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
