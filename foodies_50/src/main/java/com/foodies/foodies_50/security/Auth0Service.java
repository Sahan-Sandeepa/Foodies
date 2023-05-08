package com.foodies.foodies_50.security;

import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class Auth0Service {

  public final String domain = "dev-8p8r54c7lh326yqn.us.auth0.com";
  private final String clientId = "CsbpkOsqtOefwAHBbRxJXCDSkoy9nGSf";
  private final String clientSecret =
    "YjvDa4Wl3wlEp9CCg83zqyM-T9bc5PgTVRnKYUUYsdB3H7biE8byZp767WDm2j0W";

  public String getAccessToken() {
    String url = "https://" + domain + "/oauth/token";
    String body = String.format(
      "grant_type=client_credentials&client_id=%s&client_secret=%s&audience=https://%s/api/v2/",
      clientId,
      clientSecret,
      domain
    );

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    HttpEntity<String> entity = new HttpEntity<>(body, headers);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<Map> response = restTemplate.postForEntity(
      url,
      entity,
      Map.class
    );

    if (response.getStatusCode() != HttpStatus.OK) {
      throw new RuntimeException(
        "Failed to get access token: " + response.getBody()
      );
    }

    return (String) response.getBody().get("access_token");
  }
}
