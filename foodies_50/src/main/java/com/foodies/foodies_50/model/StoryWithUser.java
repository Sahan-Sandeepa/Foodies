package com.foodies.foodies_50.model;

public class StoryWithUser {
    private String id;
    private String image;
    private String caption;

    private String userId;
    private String userName;

    
 
    public StoryWithUser(String id, String image, String caption, String userId, String userName) {
        this.id = id;
        this.image = image;
        this.caption = caption;
        this.userId = userId;
        this.userName = userName;
    }

    public StoryWithUser() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    

    

}
