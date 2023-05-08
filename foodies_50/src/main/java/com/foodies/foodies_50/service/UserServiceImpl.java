package com.foodies.foodies_50.service;

import com.foodies.foodies_50.model.User;

public interface UserServiceImpl {
    User findByUsername(String username);

    boolean authenticate(String username, String password);
}
