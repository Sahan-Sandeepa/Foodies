import React, { useState, useEffect } from "react";
import { List, Button, Table, Input } from "antd";
import axios from "axios";
import "../../Assets/styles/style.css";
import logo from "../../Assets/images/bg.png";
import Side_menu from "../common/side_menu";
import Story from "../story/Story";
import { Card, Avatar, Image, Typography, Form, Modal } from "antd";
import {
  HeartOutlined,
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";

const { Text } = Typography;

const Home = () => {
  const [story, setStory] = useState([]); // Data for the feed
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalImages, setModalImages] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loadedData, setLoadedData] = useState(story.slice(0, 3));
  const [showPost, setPost] = useState([]);
  const [comment, setComments] = useState([]);
  const navigate = useNavigate();
  const id =useParams();
  {
    /* like start*/
  }
  const [liked, setLiked] = useState({});
  // const [unliked,setUnliked] =useState({});
  const [isLiked, setIsLiked] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const handleLike = (postId) => {
    setLiked((prevState) => ({
      ...prevState,
      [postId]: true,
    }));
    sessionStorage.setItem(`post-${postId}-isLiked`, "true");
  };

  const handleUnlike = (postId) => {
    setLiked((prevState) => ({
      ...prevState,
      [postId]: false,
    }));
    sessionStorage.setItem(`post-${postId}-isLiked`, "false");
  };

  useEffect(() => {
    const postIds = showPost.map((post) => post.id);
    const likedInStorage = postIds.reduce((prev, postId) => {
      const isLikedInStorage = sessionStorage.getItem(`post-${postId}-isLiked`);
      return {
        ...prev,
        [postId]: isLikedInStorage === "true",
      };
    }, {});
    setLiked(likedInStorage);
  }, [showPost]);

  {
    /* like end*/
  }


  const loadMore = () => {
    setLoadedData(datas);
    setShowMore(false);
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:8095/story/");
      const data = response.data;
      console.log(data);
      setStory(response.data);
      // Update your state with the fetched data here
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8095/post/");
      const data = response.data;
      setPost(response.data);
      // Update your state with the fetched data here
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8095/comment/');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  const handlecomment = (e) => {
    e.preventDefault();
    // get the form data from state or refs
    const comments = {
      comment


    };

    axios
      .post(`http://localhost:8095/comment/create/${id}`, comments)
      .then(() => {
        navigate("/home");

      })
      .catch((err) => {
        alert(err);
        console.log(comments)
      });

  }

  const handleEditComment = () => {
    console.log("succcsss")
  }

  const handleDeleteComment = () => {
    console.log("deleted")
  }

  //dashboard columns
  const columns = [
    {
      title: "Donation Name",
      dataIndex: "caption",
      key: "caption",
      render: (text) => (
        <div style={{ fontFamily: "cursive", fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="Avatar"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              margin: "10px",
              borderColor: "red",
              borderStyle: "groove",
              boxShadow: "3px 3px 3px #e78267",
            }}
            onClick={() => setModalImages(image)}
          />
        </div>
      ),
    },
  ];

  //post columns
  const datas = [
    {
      title: "Donation Name",
      dataIndex: "mood",
      key: "mood",
      render: (text) => (
        <div style={{ fontFamily: "cursive", fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "Donation Name",
      dataIndex: "caption",
      key: "caption",
      render: (text) => (
        <div style={{ fontFamily: "cursive", fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "Donation Name",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <div style={{ fontFamily: "cursive", fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "Image",
      key: "postImage",
      dataIndex: "postImage",
      render: (postImage) => (
        <div>
          <img src={postImage} style={{}} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className="login"
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*isuru starts here */}
        <Card style={{ backgroundColor: "lightblue" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ overflowX: "auto", display: "flex" }}>
              {story.map((item) => (
                <Card
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <div
                    key={item.key}
                    style={{
                      marginRight: "30px",
                      borderColor: "red",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {columns[1].render(item.image)}
                    {columns[0].render(item.caption)}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Modal
            visible={modalImages !== null}
            onCancel={() => setModalImages(null)}
            footer={null}
            style={{ height: 650 }}
            width={740}
          >
            <img
              src={modalImages}
              alt="Selected Image"
              style={{ width: 700, height: 500 }}
            />

            {/* <div style={{ marginTop: "10px" }}>
            {selectedItem?.caption}
          </div> */}
          </Modal>
          <br></br>
          {/* isuru ends here */}

          {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div >
              {showPost.map(item => (
                // <Card>
                <div key={item.key} style={{ borderColor: "red" }}>
                  {columns[1].render(item.postImage)}
                  {columns[0].render(item.caption)}
                  {columns[0].render(item.mood)}
                  {columns[0].render(item.location)}

                </div>
                // </Card>

              ))}
            </div>
          </div> */}

          <Card style={{ backgroundColor: "#3C1676" }}>
            <Card>
              <List
                itemLayout="vertical"
                size="large"
                style={{ padding: 6, width: 800 }}
                dataSource={showPost.slice().reverse()}
                renderItem={(item) => (
                  <Card
                    style={{
                      borderColor: "#3C1676",
                      margin: 10,
                      borderWidth: 3.5,
                      marginRight: 50,
                      marginBottom: 25,
                    }}
                  >
                    <List.Item
                      key={item.caption}
                    >
                      <div className="postInfor">
                        <List.Item.Meta
                          avatar={<Avatar src={item.profilePicture} />}
                          title={<a href={item.href}>{item.userName}</a>}
                          description={
                            <div className="postLocationText">
                              <EnvironmentOutlined />
                              &nbsp;{item.location}
                            </div>
                          }
                        />
                      </div>
                      <div>
                        <br />
                        <img
                          src={item.postImages}
                          alt="Friend"
                          style={{
                            width: "500px",
                            height: "500px",
                          }}
                        />
                        <br></br>
                        <br></br>
                        <button
                          onClick={() => handleLike(item.id)}
                          disabled={liked[item.id]}
                          className={`likeButton ${liked[item.id] ? "liked" : "unliked"
                            }`}
                        >
                          Yummy
                        </button>
                        <button
                          onClick={() => handleUnlike(item.id)}
                          disabled={!liked[item.id]}
                          className={`unlikeButton ${liked[item.id] ? "unliked" : "liked"
                            }`}
                        >
                          UnYum
                        </button>
                        {/* <p>{numLikes}</p> */}
                        <div className="postCaptionText">{item.caption}</div>
                        <div className="postMoodText">
                          Is Feeling: {item.mood}
                        </div>
                        <CommentOutlined
                          key="comments"
                          style={{ fontSize: 30 }}
                        />{" "}
                        {item.comments}
                        <br></br>
                        <br></br>
                        <Form.Item
                          name="comment"
                        >
                          <Input placeholder="Comments" onChange={(val) => {
                            setComments(val.target.value);
                          }}
                            addonAfter={<Button type="primary" onClick={handlecomment}>
                              Send

                            </Button>} />
                        </Form.Item>

                        {item.comment && item.comment.map(comment => (
                          <div key={comment.id} className="comment">
                            {comment.comment}
                            <span className="comment-icons">
                              <EditOutlined onClick={() => handleEditComment(comment.id)} />
                              <DeleteOutlined onClick={() => handleDeleteComment(comment.id)} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </List.Item>
                  </Card>



                )}
              >
                {!showMore && (
                  <List.Item>
                    <Button onClick={() => setShowMore(true)}>Load More</Button>
                  </List.Item>
                )}
                {showMore && (
                  <List.Item>
                    <Button onClick={loadMore}>Load All</Button>
                  </List.Item>
                )}
              </List>
            </Card>
          </Card>
        </Card>
      </div>
    </>
  );
};

export default Home;
