package com.foodies.foodies_50.model;
import java.time.LocalDate;
import javax.persistence.Id;

public class Comment {
    @Id
    private String commentId;
    private String comment;
    private String commentedBy;
    private LocalDate commentedAt;

    public Comment(){
        
    }


    public String getCommentId() {
        return commentId;
    }
    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public String getCommentedBy() {
        return commentedBy;
    }
    public void setCommentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
    }
    public LocalDate getCommentedAt() {
        return commentedAt;
    }
    public void setCommentedAt(LocalDate commentedAt) {
        this.commentedAt = commentedAt;
    }

    
    
}
