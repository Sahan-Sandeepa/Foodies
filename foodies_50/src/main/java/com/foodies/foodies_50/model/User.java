package com.foodies.foodies_50.model;

// import java.time.LocalDate;
import org.springframework.data.mongodb.core.mapping.Document;

// import jakarta.persistence.Transient;

@Document(collection = "user")

public class User {
    private String id;
    private String username;
    private String name;
    private String email;
    private String bio;
    private String password;
    private String imageUrl;

    // @Transient
    // private LocalDate createdDate;

    public User() {
    }

    public String getid() {
        return id;
    }
    
    public void setid(String id) {

        this.id = id;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // public LocalDate getCreatedDate() {
    //     return createdDate;
    // }

    // public void setCreatedDate(LocalDate createdDate) {
    //     this.createdDate = createdDate;
    // }

}
