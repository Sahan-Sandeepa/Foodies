package com.foodies.foodies_50.model;

import java.time.LocalDate;

public class Notification {
    private String id;
    private String notificationId;
    private String message;
    private String notificatedTo;
    private LocalDate notificatedAt;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getNotificationId() {
        return notificationId;
    }
    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getNotificatedTo() {
        return notificatedTo;
    }
    public void setNotificatedTo(String notificatedTo) {
        this.notificatedTo = notificatedTo;
    }
    public LocalDate getNotificatedAt() {
        return notificatedAt;
    }
    public void setNotificatedAt(LocalDate notificatedAt) {
        this.notificatedAt = notificatedAt;
    }


    
}
