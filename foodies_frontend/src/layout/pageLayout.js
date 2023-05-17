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
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = ({ children }) => {
  const { logout } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  function getItem(label, key, icon) {
    return {
      key,
      label,
      icon,
      onClick: () => {
        if (key === "logout") {
          logout();
        } else {
          navigate(key);
        }
      },
    };
  }

  const items = [
    getItem("Home", "/dashboard", <BankTwoTone />),
    getItem("Post", "/post", <UserOutlined />),
    getItem("Story", "/story", <SyncOutlined spin />),
    getItem("Find Friends", "/friends", <MessageOutlined />),
    getItem("Notification", "/notification", <NotificationOutlined />),
    getItem("Profile", "/profile", <LineChartOutlined />),
    getItem("Find Friends","",<UsergroupAddOutlined />),
    getItem("Logout", "logout", <LogoutOutlined />),
    
  ];

  const [collapsed, setCollapsed] = useState(false);

  let selectedKeys = location.pathname;

  return (
    <>
      <div>
        <Layout style={{ minHeight: "180vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="dark"
              selectedKeys={[selectedKeys]}
              mode="inline"
              items={items}
              Button="hello"
            />
          </Sider>

          <Layout className="site-layout">
            <Content style={{ margin: "0 16px" }}>{children}</Content>
            <Footer style={{ textAlign: "center" }}>
              Foodies System ©2023
            </Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default PageLayout;
