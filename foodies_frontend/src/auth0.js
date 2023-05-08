import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "dashboard");
  };

  return (
    <Auth0Provider
      domain="dev-8p8r54c7lh326yqn.us.auth0.com"
      clientId="mXaozxaZY7QTMnSvdQOu2QIQJw5kqSaS"
      authorizationParams={{
        redirect_uri: window.location.origin + "/callback",
        audience: "http://localhost:8095",
      }}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
