package com.foodies.foodies_50.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.foodies.foodies_50.model.Notification;

public interface NotificationReposiyary extends MongoRepository<Notification,String> {
    
}
