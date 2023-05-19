import React, { useState } from "react";
import { Form, Input, Button, Upload, Col, Row, Card } from "antd";
import axios from "axios";
import "../../Assets/styles/style.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "antd/es/form/Form";
import { imageToBase64 } from "../../services/imageTobase64";

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

const Register = () => {
  const [form] = useForm();
  const { loginWithRedirect } = useAuth0();

  const handleImageInputChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const base64String = await imageToBase64(file);
      form.setFieldValue("imageUrl", base64String);
    }
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8095/users/create", form.getFieldsValue())
      .then(() => {
        alert("User created!");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          {/* <Row> */}
          <div
            style={{
              padding: 2.5,
              backgroundColor: "#EA5FF8",
              borderRadius: 5,
            }}
          >
            <Col span={6} />
            <Card
              class="card1"
              style={{
                width: 900,
                backgroundColor: "#DFD5F9",
                borderRadius: 5,
                borderColor: "red",
              }}
            >
              <Row>
                <Col span={24}>
                  <Form
                    {...layout}
                    style={{
                      maxWidth: 700,
                      padding: 5,
                      paddingLeft: 70,
                    }}
                    form={form}
                    onFinish={handleSubmit}
                  >
                    <Row>
                      <Col span={9} />
                      <h1 style={{ fontStyle: "italic", fontWeight: "bold" }}>
                        Hello Foodies!
                      </h1>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item label="Profile Image:" name="imageUrl">
                          <div>
                            <input
                              type="file"
                              onChange={handleImageInputChange}
                            />
                            {form.getFieldValue("imageUrl") && (
                              <img
                                src={form.getFieldValue("imageUrl")}
                                alt="Selected Image"
                                style={{ width: 50 }}
                              />
                            )}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <br></br>
                    <Col span={40}>
                      <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name="bio" label="Bio">
                      <TextArea rows={4} showCount maxLength={100} />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="E-mail"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <Row>
                      <Col span={7} />
                      <Col span={10}>
                        <Form.Item
                          wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                          }}
                        >
                          <Button type="primary" htmlType="submit">
                            CREATE ACCOUNT
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Row>
                        <Col span={10} />
                        <h4>
                          Already have an Account?
                          <a onClick={loginWithRedirect}> Sign In</a>
                        </h4>
                      </Row>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
            {/* </Row> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
