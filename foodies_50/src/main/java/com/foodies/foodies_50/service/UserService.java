package com.foodies.foodies_50.service;

import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.repository.MongoDBUserRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private MongoDBUserRepository userRepository;

  public List<User> getAlluser() {
    return userRepository.findAll();
  }

  public User addUser(User User) {
    User.setPassword(null);
    return userRepository.save(User);
  }

  public User getUserByUserId(String UserId) {
    return userRepository.findById(UserId).get();
  }

  public User updateUser(User UserRequest) {
    //get the existing document from DB
    // populate new value from request to existing object/entity/document
    User existingUser = userRepository.findById(UserRequest.getid()).get();
    existingUser.setUsername(UserRequest.getUsername());
    existingUser.setName(UserRequest.getName());
    existingUser.setBio(UserRequest.getBio());
    if (UserRequest.getImageUrl() != null) existingUser.setImageUrl(
      UserRequest.getImageUrl()
    );
    return userRepository.save(existingUser);
  }

  public String deleteUserById(String UserId) {
    userRepository.deleteById(UserId);
    return UserId + " User deleted ";
  }
}
