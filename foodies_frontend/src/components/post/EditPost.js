import React, { useEffect } from 'react'
import { Button, Form, Input, Card, Modal, Upload, Col, Row, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from "axios";
import '../../Assets/styles/style.css'
import { Link } from 'react-router-dom';



const { TextArea } = Input;

const onFinish = (values) => {
    console.log(values);
};

const EditPost = props => {



    const [mood, setMood] = useState("");
    const [location, setLocation] = useState('');
    const [caption, setCaption] = useState("");
    const [postImage, setBase64Image] = useState("");
    const [posts,setPosts] = useState("");

    const { isModalOpen, handleCancel, handleOk, selectedItem } = props



    const imageToBase64 = file => {

        return new Promise((resolve, reject) => {

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)

        })

    }

    const handleImageInputChange = async event => {
        const file = event.target.files && event.target.files[0]
        if (file) {
            const base64String = await imageToBase64(file)
            setBase64Image(base64String)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // get the form data from state or refs

        const PostSchema = {
            caption,
            postImage,
            mood,
            location,
        };
        axios
            // .put("http://localhost:8095/post/create", PostSchema)
            .then(() => {
            })
            .catch((err) => {
                alert(err);
                console.log(PostSchema)
            });
    }

    useEffect(() => {

        if (selectedItem) {
            setMood(selectedItem.mood);
            setLocation(selectedItem.location);
            setCaption(selectedItem.caption);
            setBase64Image(selectedItem.postImage);
        }

    }, [])
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
        getPosts();
      }, []);

    return (
        <>
            <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleOk} footer={null} width={900}>

                <div style={{ backgroundColor: "#D1D0CE", padding: "30px" }}>

                    <h1 style={{ fontSize: "27px", fontFamily: "fantasy", color: "#191970", textAlign: "center" }}>Edit Post</h1>

                    <br></br>
                    <div style={{ backgroundColor: "#D1D0CE" }}>
                        <Card class="card1" style={{ width: 800, backgroundColor: "#C9C0BB", borderRadius: 5, borderColor: "red" }}>
                            <Form
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 1000, padding: 2, paddingLeft: 120
                                }}


                            >
                                <br></br>
                                <br></br>
                                <Row gutter={[48, 16]}>
                                    <Form.Item
                                        label="Story Image"
                                        name="image"
                                    >
                                        <div>
                                            <input type="file" onChange={handleImageInputChange} />
                                            {postImage && <img src={postImage} alt="Selected Image" style={{ width: 150 }} />}
                                        </div>
                                    </Form.Item>

                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <Form.Item
                                        name="caption"
                                        label="Caption"
                                        initialValue={selectedItem?.caption}
                                    >
                                        <TextArea
                                            onChange={(val) => {
                                                setCaption(val.target.value);

                                            }} style={{ borderColor: "black", borderWidth: "2px" }}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        name="location"
                                        label="Location"
                                        initialValue={selectedItem?.location}
                                    >
                                        <Input 

                                            onChange={(val) => {
                                                setLocation(val.target.value);

                                            }} style={{ borderColor: "black", borderWidth: "2px" }}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        name="mood"
                                        label="Mood"
                                        initialValue={selectedItem?.mood}
                                    >
                                        <Input 

                                            onChange={(val) => {
                                                setMood(val.target.value);

                                            }}
                                            style={{ borderColor: "black", borderWidth: "2px" }}
                                        />

                                    </Form.Item>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={9} />

                                    <Form.Item

                                    >
                                        <Button type="link" htmlType="submit" style={{ backgroundColor: "#FBB117", fontWeight: "bold", borderRadius: "13px", borderColor: "#151B54", borderWidth: "2px", color: "#151B54" }} onClick={handleCancel} >
                                            Discard
                                        </Button>
                                    </Form.Item>
                                    <Col span={2} />

                                    <Form.Item

                                    >
                                        <Button type="link" htmlType="submit" style={{ backgroundColor: "#004225", color: "white", fontWeight: "bold", borderRadius: "13px", borderColor: "#151B54", borderWidth: "2px" }} >
                                            Update
                                        </Button>
                                    </Form.Item>

                                </Row>

                            </Form>
                        </Card>
                    </div>

                </div>
            </Modal>


        </>
    )
}

export default EditPost