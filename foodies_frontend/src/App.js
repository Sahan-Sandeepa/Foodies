import "./App.css";
import Home from "./components/Home/Home";
import Post from "./components/post/Post";
import Story from "./components/story/Story";
import Login from "./components/user/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import EditPost from "./components/post/EditPost";
import { CallbackPage } from "./components/callback";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ProtectedComponent } from "./components/common/protectedComponent";
import Message from "./components/Friends/FindFriends";
import UserProfile from "./components/user/UserProfile";
import Notification from "./components/Notification/Notification";
import Comment from "./components/comment/Comment";
import { Skeleton } from "antd";
import Friends from "./components/Friends/FindFriends";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import StoryView from "./components/story/StoryView";
import NotificationPage from "./components/Notification/Notification";

function App() {
  const divStyle = {
    backgroundColor: '#ff0000', // Replace #ff0000 with your desired color code
  };
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  axios.interceptors.request.use(
    async (config) => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  if (isLoading) return <Skeleton />;

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<ProtectedComponent child={<Home />} />} />
      <Route path="/story" element={<ProtectedComponent child={<Story />} />} />
      <Route path="/post" element={<ProtectedComponent child={<Post />} />} />
      <Route path="/home" element={<ProtectedComponent child={<Home />} />} />
      <Route
        path="/notification"
        element={<ProtectedComponent child={<Notification />} />} />
      <Route
        path="/editProfile"
        element={<ProtectedComponent child={<UserProfile />} />} />
      <Route
        path="/friends"
        element={<ProtectedComponent child={<Friends />} />} />

      <Route
        path="/profile"
        element={<ProtectedComponent child={<Profile />} />} />

      <Route
        path="/message"
        element={<ProtectedComponent child={<Message />} />} />
      <Route
        path="/editPost"
        element={<ProtectedComponent child={<EditPost />} />} />
      <Route
        path="/storyView"
        element={<ProtectedComponent child={<StoryView />} />} />
      <Route
        path="/noti"
        element={<ProtectedComponent child={<NotificationPage />} />} />
         <Route
        path="/comment"
        element={<ProtectedComponent child={<Comment />} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route
        path="/"
        element={isAuthenticated ? (
          <Navigate to={"/dashboard"} />
        ) : (
          <Navigate to={"/register"} />
        )} />
      <Route path="*" element={<center>Not Found</center>} />


    </Routes>
    
    
  );
}

export default App;
