package com.foodies.foodies_50.controller;

import ch.qos.logback.core.model.Model;
import com.foodies.foodies_50.model.User;
import com.foodies.foodies_50.security.Auth0Service;
import com.foodies.foodies_50.service.UserService;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class user_Controller {

  @Autowired
  private UserService userService;

  @PostMapping("/create")
  @ResponseStatus(HttpStatus.CREATED)
  public User createUser(@RequestBody User User) {
    Auth0Service auth0Service = new Auth0Service();
    String accessToken = auth0Service.getAccessToken();
    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);
    headers.setContentType(MediaType.APPLICATION_JSON);

    String url = "https://" + auth0Service.domain + "/api/v2/users";
    String body = String.format(
      "{\"email\":\"%s\",\"password\":\"%s\",\"connection\":\"Username-Password-Authentication\"}",
      User.getEmail(),
      User.getPassword()
    );
    HttpEntity<String> entity = new HttpEntity<>(body, headers);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<Map> response = restTemplate.postForEntity(
      url,
      entity,
      Map.class
    );

    if (response.getStatusCode() != HttpStatus.CREATED) {
      throw new RuntimeException(
        "Failed to create user: " + response.getBody()
      );
    }
    User.setid(response.getBody().get("user_id").toString());
    return userService.addUser(User);
  }

  @GetMapping("/")
  public List<User> getUsers() {
    return userService.getAlluser();
  }

  @GetMapping("/current")
  public User getCurrentUser(Principal principal) {
    return userService.getUserByUserId(principal.getName());
  }

  @PutMapping("/current")
  public User modifyUser(@RequestBody User User, Principal principal) {
    User.setid(principal.getName());
    return userService.updateUser(User);
  }

  @DeleteMapping("/current")
  public String deleteUser(Principal principal) {
    Auth0Service auth0Service = new Auth0Service();
    String accessToken = auth0Service.getAccessToken();
    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);
    headers.setContentType(MediaType.APPLICATION_JSON);

    String url =
      "https://" + auth0Service.domain + "/api/v2/users/" + principal.getName();
    HttpEntity<?> request = new HttpEntity<Object>(headers);
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response = restTemplate.exchange(
      url,
      HttpMethod.DELETE,
      request,
      String.class
    );

    if (response.getStatusCode().value() != 204) {
      throw new RuntimeException(
        "Failed to delete user: " + response.getBody()
      );
    }
    return userService.deleteUserById(principal.getName());
  }
}
