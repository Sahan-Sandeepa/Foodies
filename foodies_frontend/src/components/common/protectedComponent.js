import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Route } from "react-router-dom";
import PageLayout from "../../layout/pageLayout";
import React from "react";
import { Skeleton } from "antd";

export const ProtectedComponent = ({ child }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Skeleton />;

  return isAuthenticated ? (
    <PageLayout>{child}</PageLayout>
  ) : (
    <Navigate to={"/login"} />
  );
};
