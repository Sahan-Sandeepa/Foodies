package com.foodies.foodies_50.model;



public class PostWithUser {

  private String id;
  private String postImages;
  private String caption;
  private String location;
  private String mood;
  private String userId;
  private String userName;
  private String profilePicture;

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public void setProfilePicture(String profilePicture) {
    this.profilePicture = profilePicture;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public PostWithUser() {}

  public PostWithUser(
    String id,
    String postImages,
    String caption,
    String location,
    String mood,
    String userId,
    String userName,
    String profilePicture
  ) {
    this.id = id;
    this.postImages = postImages;
    this.caption = caption;
    this.location = location;
    this.mood = mood;
    this.userId = userId;
    this.userName = userName;
    this.profilePicture = profilePicture;
  }

  public String getid() {
    return id;
  }

  public void setid(String id) {
    this.id = id;
  }

  public String getPostImages() {
    return postImages;
  }

  public void setPostImages(String postImages) {
    this.postImages = postImages;
  }

  public String getCaption() {
    return caption;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getMood() {
    return mood;
  }

  public void setMood(String mood) {
    this.mood = mood;
  }
}
