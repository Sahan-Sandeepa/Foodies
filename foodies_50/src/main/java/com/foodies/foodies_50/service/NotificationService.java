package com.foodies.foodies_50.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodies.foodies_50.model.Notification;
import com.foodies.foodies_50.repository.NotificationReposiyary;

@Service

public class NotificationService {
    @Autowired
    private NotificationReposiyary repository;

    //CRUD  CREATE , READ , UPDATE , DELETE


    public Notification addNotification(Notification Notification) {
        Notification.setNotificationId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(Notification);
    }

    public List<Notification> findAllNotifications() {
        return repository.findAll();
    }

    public Notification getNotificationByNotificationId(String NotificationId){
        return repository.findById(NotificationId).get();
    }

    
    public Notification updateNotification(Notification notification){
        //get the existing document from DB
        // populate new value from request to existing object/entity/document
        Notification existingComment = repository.findById(notification.getId()).get();
        existingComment.setMessage(notification.getMessage());
       
        return repository.save(existingComment);
    }

    public String deleteNotification(String NotificationId){
        repository.deleteById(NotificationId);
        return NotificationId+" Notification deleted from dashboard ";
    }
}
