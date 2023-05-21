import React from 'react'
import { Button, Row, Col, Card, Avatar, Typography, Modal } from "antd";
import "../../Assets/styles/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import EditPost from "../post/EditPost.js";
import { notification } from 'antd';
import EditStory from './EditStory';
import Story from './Story';
const StoryView = () => {
    const [storys, setStory] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCancel = () => {
        setIsModalOpen(false);
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
    const handleDeleteAccount = async (id) => {
        axios.delete(`http://localhost:8095/story/${id}`)
            .then(() => {
                window.location.reload();

                notification.success({
                    message: 'Deleted Successful',
                    description: 'You have successfully Deleted Report',
                });
                window.location.reload();

                // setIsDeleteModalOpen(false); // Hide the delete modal
                // refresh();
            }).catch((err) => {
                console.log(err);
            })
    };


    const handleCreate = () => {
        navigate("/story")
    }

    return (

        <>
            <div
                className="login"
                style={{
                    minHeight: "180vh",
                    display: "flex",
                }}
            >
                <div style={{ padding: 25 }}>
                    <div style={{ paddingLeft: 20 }}>
                        <Button type='primary'
                            onClick={handleCreate}
                        >Create Story</Button>

                    </div>
                    <Row
                        gutter={2}
                        style={{
                            marginTop: "5px",
                            width: "100%",
                        }}
                    >
                        {storys.map((item) => (
                            <Col>
                                <Card
                                    style={{
                                        borderColor: "#3C1676",
                                        borderWidth: 3.5,
                                        margin: "5px",
                                    }}
                                >
                                    <div >
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
                                                borderRadius:5
                                            }}
                                            onClick={() => handleDeleteAccount(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                    <br></br>
                                    <div>
                                        <img
                                            src={item.image}
                                            alt="Friend"
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                            }} />
                                        <div className="postCaptionText">{item.caption}</div>
                                        <div className="postMoodText">
                                            Story Mood
                                        </div>
                                    </div>
                                    <EditStory
                                        isModalOpen={isModalOpen}
                                        handleCancel={handleCancel}
                                        handleOk={async () => {
                                            setIsModalOpen(false);
                                        }}
                                        selectedItem={selectedItem} />

                                    {/* <Story
                                    isCreateModalOpen={isCreateModalOpen}
                                    handleCancel={handleCancel}
                                    handleOk={async () => {
                                        setCreateIsModalOpen(false);
                                    }}
                                  /> */}
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </div>
            </div>
        </>
    )
}

export default StoryView