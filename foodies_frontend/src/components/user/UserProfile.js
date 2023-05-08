import { Form, Input, Button, Row, Col, Card, Avatar } from "antd"; // Import Avatar component from antd
import "../../Assets/styles/style.css";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { imageToBase64 } from "../../services/imageTobase64";

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const UserProfile = () => {
  const [form] = useForm();
  const [img, setImg] = useState();

  useEffect(() => {
    const getAllEventDetails = () => {
      axios
        .get("http://localhost:8095/users/current")
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          form.setFieldValue("name", data.name);
          form.setFieldValue("username", data.username);
          form.setFieldValue("bio", data.bio);
          form.setFieldValue("email", data.email);
          setImg(data.imageUrl);
        })
        .catch(() => {
          alert("Error loading profile");
        });
    };
    getAllEventDetails();
  }, []);

  const onSubmit = () => {
    axios
      .put("http://localhost:8095/users/current", form.getFieldsValue())
      .then(() => alert("User updated"))
      .catch((e) => alert(e));
  };

  const handleImageInputChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const base64String = await imageToBase64(file);
      form.setFieldValue("imageUrl", base64String);
      setImg(base64String);
    }
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
          <div style={{ padding: 1 }}>
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
                <Row>
                  <Col span={4}>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "16px",
                        paddingTop: 20,
                        paddingLeft: 50,
                      }}
                    >
                      <Avatar src={img} size={90} icon={<UserOutlined />} />
                    </div>
                  </Col>
                  <Col span={20}>
                    <div style={{ paddingLeft: 150 }}>
                      <h2>{form.getFieldValue("username")}</h2>
                    </div>
                  </Col>
                </Row>
                <Col span={24}>
                  <Form
                    {...layout}
                    style={{
                      maxWidth: 700,
                      padding: 5,
                      paddingLeft: 70,
                    }}
                    form={form}
                    onFinish={onSubmit}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item label="Profile Image:" name="imageUrl">
                          <div>
                            <input
                              type="file"
                              onChange={handleImageInputChange}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Col span={40}>
                      <Form.Item name="name" label="Name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Form.Item name="username" label="Username">
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
                      <Input disabled />
                    </Form.Item>
                    <br></br>
                    <Row>
                      <Col span={7} />
                      <Col span={10}>
                        <Form.Item
                          wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                          }}
                        >
                          <Row>
                            <Col span={12}>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                            </Col>
                            <Col span={12}>
                              <Button type="primary" htmlType="submit">
                                Delete My Account
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      </Col>
                    </Row>
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

export default UserProfile;
