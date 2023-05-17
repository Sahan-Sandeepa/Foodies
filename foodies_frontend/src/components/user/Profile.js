import { Form, Input, Button, Row, Col, Card, Avatar, Typography } from "antd"; // Import Avatar component from antd
import "../../Assets/styles/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Profile = () => {
  const [img, setImg] = useState();
  const [posts, setPosts] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    const getPosts = () => {
      axios
        .get("http://localhost:8095/post/current")
        .then((res) => {
          setPosts(res.data);
        })
        .catch(() => {
          alert("Error loading posts");
        });
    };
    const getAllProfileDetails = () => {
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
    getAllProfileDetails();
    getPosts();
  }, []);

  const navigate = useNavigate();

  const navigateToEditProfile = () => {
    navigate("/editProfile");
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          {/* <Row> */}
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
                      <Avatar src={img} size={90} icon={<UserOutlined />} />{" "}
                      {/* You can replace the UserOutlined icon with the actual profile picture retrieved */}
                    </div>
                  </Col>
                  <Col span={10}>
                    <div style={{ paddingLeft: 160 }}>
                      <h2>{form.getFieldValue("username")}</h2>

                      <Text strong style={{ paddingLeft: 5 }}>
                        {form.getFieldValue("name")}
                      </Text>
                      <div style={{ paddingLeft: 5 }}>
                        {form.getFieldValue("bio")}
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    <div style={{ paddingLeft: 250, paddingTop: 25 }}>
                      <Button onClick={navigateToEditProfile}>
                        Edit Profile
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={20}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  {posts.map((e) => (
                    <Col>
                      <Card bordered={false} style={{ margin: "10px" }}>
                        Card content
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Row>
            </Card>
            {/* </Row> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
