package com.foodies.foodies_50.model;


public class Comment {
    private String id;
    private String comment;
    private String userId;
    private String postId;

    public Comment() {
    }

   

    public Comment(String id, String comment, String userId, String postId) {
        this.id = id;
        this.comment = comment;
        this.userId = userId;
        this.postId = postId;
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
    //     return commentedAt;
    // }

    // public void setCommentedAt(LocalDate commentedAt) {
    //     this.commentedAt = commentedAt;
    // }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }



    public String getUserId() {
        return userId;
    }



    public void setUserId(String userId) {
        this.userId = userId;
    }

    

}
