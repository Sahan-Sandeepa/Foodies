package com.foodies.foodies_50;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EntityScan(basePackages = "com.foodies.foodies_50.model")
public class Foodies50Application {

  public static void main(String[] args) {
    SpringApplication.run(Foodies50Application.class, args);
  }
}
