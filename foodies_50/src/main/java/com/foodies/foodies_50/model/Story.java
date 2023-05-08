package com.foodies.foodies_50.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="story")

public class Story {

    private String  id;
    private String image;
    private String caption;

    public Story() {
        // Default constructor with no arguments
    }

  

    public Story(String id, String image2) {
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



    public String getid() {
        return id;
    }



    public void setid(String id) {
        this.id = id;
    }
    


    // private Date createdAt;
    // private Date uppdateAt;
   

   
}
