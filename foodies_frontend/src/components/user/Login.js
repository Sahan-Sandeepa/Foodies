import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Card, Row, Col } from "antd";
import "../../Assets/styles/style.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      className="login"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // ensure the background covers the entire height of the viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row>
        <Col span={24}>
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        </Col>
        <Col span={24}>
          <Link to="/user">
            <h4>
              No Account?<a> Sign Up</a>
            </h4>
          </Link>
        </Col>
      </Row>
    </div>
  );

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  return (
    <>
      <div
        className="login"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh", // ensure the background covers the entire height of the viewport
          display: "flex",
       
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ padding: 1 }}>
          <Col span={6} />
          <Card style={{ width: 700, backgroundColor: "whitesmoke" }}>
            <br></br>
            <Row>
              <br></br>

              <Col span={5} />
              <br></br>
              <h2 style={{ fontStyle: "italic" }}>
                Welcome , Hello Foodies Login
              </h2>
            </Row>
            <br></br>

            <Col span={3} />
            <Form
              name="basic"
              style={{
                maxWidth: 600,
                paddingLeft: 120,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Col span={15}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>

              <br></br>

              <Row>
                <Col span={8} />
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>

              <Form.Item>
                <Row>
                  <Col span={6} />
                  <Link to="/user">
                    <h4>
                      No Account?<a> Sign Up</a>
                    </h4>
                  </Link>
                </Row>
              </Form.Item>
              <Form.Item>
                <GoogleOAuthProvider clientId="624758508283-iuen7sg335ec95fbv9bmog1thfvhqu3d.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(response) => {
                      const token = response.accessToken;
                      axios
                        .post(
                          "http://localhost:8095/user/api",
                          {},
                          {
                            params: {
                              access_token: token,
                            },
                          }
                        )
                        .then((response) => {
                          console.log(response.data);
                          navigate("/home");
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  />
                </GoogleOAuthProvider>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
