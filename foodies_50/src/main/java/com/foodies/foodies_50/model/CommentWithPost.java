package com.foodies.foodies_50.model;


public class CommentWithPost {
    private String id;
    private String comment;
    private String userId;
    private String postId;
    private String userName;

    public CommentWithPost() {
    }

    
    public CommentWithPost(String id, String comment, String userId, String postId,
            String userName) {
        this.id = id;
        this.comment = comment;
        this.userId = userId;
        this.postId = postId;
        this.userName = userName;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    // public String getCommentedBy() {
    //     return commentedBy;
    // }

    // public void setCommentedBy(String commentedBy) {
    //     this.commentedBy = commentedBy;
    // }

    // public LocalDate getCommentedAt() {
    // return commentedAt;
    // }

    // public void setCommentedAt(LocalDate commentedAt) {
    // this.commentedAt = commentedAt;
    // }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }


    public String getUserName() {
        return userName;
    }


    public void setUserName(String userName) {
        this.userName = userName;
    }

}