import { Button, Row, Col, Card, Avatar, Typography, Modal } from "antd";
import "../../Assets/styles/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import EditPost from "../post/EditPost.js";
import { notification } from 'antd';

const { Text } = Typography;

const Profile = () => {
  const [img, setImg] = useState();
  const [posts, setPosts] = useState([]);
  const [form] = useForm();
  const {id} =useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  {
    /* Modal Starts here */
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  {
    /* Modal Ends here */
  }

  const handleDeleteAccount = async (id) => {
    axios.delete(`http://localhost:8095/post/${id}`)
        .then(() => {
            notification.success({
                message: 'Deleted Successful',
                description: 'You have successfully Deleted Report',
            });
            // setIsDeleteModalOpen(false); // Hide the delete modal
            // refresh();
        }).catch((err) => {
            console.log(err);
        })
};
  // const handleDeleteAccount = () => {
  //   axios
  //     .delete("http://localhost:8095/post/" +id)
  //     .then(() => {
  //       // Show success message
  //       alert("Account deleted successfully");
  //       // Redirect the user to the login page or any other desired location
  //       // Replace the code below with the appropriate navigation code
  //     })
  //     .catch((error) => {
  //       // Show error message
  //       alert("Error deleting account. Please try again later.");
  //     });
  // };

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
                  {posts.map((item) => (
                    <Col>
                      <Card
                        style={{
                          borderColor: "#3C1676",
                          borderWidth: 3.5,
                          margin: "10px",
                        }}
                      >
                        <div style={{ paddingLeft: "30%" }}>
                          <Button
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                              fontWeight: "bold",
                              borderRadius: "13px",
                                borderWidth: "2px",
                            }}
                            onClick={() => {
                              setIsModalOpen(true);
                              setSelectedItem(item);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontWeight: "bold",
                              borderWidth: "2px",
                            }}
                            onClick={() => handleDeleteAccount(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                        <div>
                          <img
                            src={item.postImages}
                            alt="Friend"
                            style={{
                              width: "200px",
                              height: "200px",
                            }}
                          />
                          <div className="postCaptionText">{item.caption}</div>
                          <div className="postMoodText">
                            Is Feeling: {item.mood}
                          </div>
                        </div>
                        <div className="postLocationText">
                          <EnvironmentOutlined />
                          {item.location}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Row>
            </Card>
            <EditPost
              isModalOpen={isModalOpen}
              handleCancel={handleCancel}
              handleOk={async () => {
                setIsModalOpen(false);
              }}
              selectedItem={selectedItem}
            />
            {/* </Row> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
