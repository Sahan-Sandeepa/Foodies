package com.foodies.foodies_50.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.foodies.foodies_50.model.Notification;
import com.foodies.foodies_50.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class Notification_Controller {
    @Autowired
    private NotificationService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Notification createNotification(@RequestBody Notification Notification){
        return service.addNotification(Notification);
    }

    @GetMapping
    public List<Notification> getNotifications() {
        return service.findAllNotifications();
    }


    @GetMapping("/{NotificationId}")
    public Notification getNotification(@PathVariable String NotificationId){
        return service.getNotificationByNotificationId(NotificationId);
    }

    

    @PutMapping
    public Notification modifyNotification(@RequestBody Notification Notification){
        return service.updateNotification(Notification);
    }

    @DeleteMapping("/{NotificationId}")
    public String deleteNotification(@PathVariable String NotificationId){
        return service.deleteNotification(NotificationId);
    }
}
