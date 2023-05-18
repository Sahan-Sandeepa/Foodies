import { Button } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  BankTwoTone,
  UserOutlined,
  MessageOutlined,
  LineChartOutlined,
  NotificationOutlined,
  LogoutOutlined,
  SyncOutlined,
  CarFilled,
} from "@ant-design/icons";
import Home from "../Home/Home";
import Story from "../story/Story";
import Post from "../post/Post";
import Message from "../Friends/FindFriends";
import Notification from "../Notification/Notification";
import Register from "../user/Register";
import UserProfile from "../user/UserProfile";
import { useAuth0 } from "@auth0/auth0-react";

const { Header, Content, Footer, Sider } = Layout;

const Side_menu = (props) => {
  const { opennav, open } = props;
  const { logout } = useAuth0();

  function getItem(label, key, icon) {
    return {
      key,
      label,
      icon,
      onClick: () => {
        if (key === 6) {
          logout();
        } else {
          setActiveIndex(key);
        }
      },
    };
  }

  const items = [
    getItem("Home", 0, <BankTwoTone />),
    getItem("Post", 1, <UserOutlined />),
    getItem("Story", 2, <SyncOutlined spin />),
    getItem("Message", 3, <MessageOutlined />),
    getItem("Notification", 4, <NotificationOutlined />),
    getItem("Profile", 5, <LineChartOutlined />),
    getItem("Logout", 6, <LogoutOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const bodyContainer = [
    <Home />,
    <Post />,
    <Story />,
    <Message />,
    <Notification />,
    <UserProfile />,
  ];
  return (
    <>
      <div>
        <Layout style={{ minHeight: "180vh" }}>
        <div style={{ textAlign: "right", padding: "16px", color: "white" }}>
            Welcome
          </div>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["0"]}
              mode="inline"
              items={items}
              Button="hello"
            />
          </Sider>

          <Layout className="site-layout">
            <Content style={{ margin: "0 16px" }}>
              {bodyContainer[activeIndex]}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Foodies System ©2023
            </Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Side_menu;
