package com.foodies.foodies_50.controller;

import com.foodies.foodies_50.model.Story;
import com.foodies.foodies_50.model.StoryWithUser;
import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.service.StoryService;
import com.foodies.foodies_50.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
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
    public Story createStory(@RequestBody Story Story, Principal principal) {
      Story.setUserId(principal.getName());
      return storyService.addStory(Story);
    }
  
    @GetMapping("/")
    public List<StoryWithUser> getStorys() {
      List<Story> Storys = storyService.findAllStoryStorys();
      List<StoryWithUser> modifiedStorys = new ArrayList<>();
      for (int i = 0; i < Storys.size(); i++) {
        Story Story = Storys.get(i);
        if (Story.getUserId() != null) {
          User userData = userService.getUserByUserId(Storys.get(i).getUserId());
          StoryWithUser StoryWithUser = new StoryWithUser(
            Story.getId(),
            Story.getImage(),
            Story.getCaption(),
            Story.getUserId(),
            userData.getUsername()
          );
          modifiedStorys.add(StoryWithUser);
        } else {
          StoryWithUser StoryWithUser = new StoryWithUser();
          StoryWithUser.setId(Story.getUserId());
          StoryWithUser.setImage(Story.getImage());
          StoryWithUser.setCaption(Story.getCaption());
          StoryWithUser.setUserId(Story.getUserId());
        }
      }
      return modifiedStorys;
    }
  
    @GetMapping("/current")
    public List<Story> getUserStorys(Principal principal) {
      return storyService.findAllStorysByUserId(principal.getName());
    }
  
    @GetMapping("/{StoryId}")
    public Story getStory(@PathVariable String StoryId) {
      return storyService.getStoryByStoryId(StoryId);
    }
  
    @PutMapping("/update/{id}")
    public ResponseEntity<Story> updateStory(
      @PathVariable("id") String id,
      @RequestBody Story Story
    ) throws Exception {
      Story updatedProduct = storyService.updateStory(id, Story);
      return ResponseEntity.ok(updatedProduct);
    }
  
    @DeleteMapping("/{id}")
    public String deleteStory(@PathVariable("id") String id) {
      return storyService.deleteStory(id);
    }
   
}
