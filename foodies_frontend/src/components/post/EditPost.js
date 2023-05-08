import React from 'react'
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

const EditPost = () => {



    const [mood, setMood] = useState("");
    const [location, setLocation] = useState('');
    const [caption, setCaption] = useState("");
    const [postImage, setBase64Image] = useState("");


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
            .post("http://localhost:8095/post/create", PostSchema)
            .then(() => {
            })
            .catch((err) => {
                alert(err);
                console.log(PostSchema)
            });
    }


    return (
        <>
            <div style={{ backgroundColor: "#D1D0CE", padding: "30px" }}>
                <br></br>
                <br></br>
                <h1 style={{ fontSize: "27px", fontFamily: "fantasy", color: "#191970", textAlign: "center" }}>Edit Post</h1>
                <br></br>
                <br></br>
                <div style={{ paddingLeft: 200, backgroundColor: "#D1D0CE" }}>
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
                                >
                                    <TextArea placeholder='Enter Caption...'
                                        onChange={(val) => {
                                            setCaption(val.target.value);

                                        }} style={{ borderColor: "black", borderWidth: "2px" }}
                                    />

                                </Form.Item>
                                <Form.Item
                                    name="location"
                                    label="Location"
                                >
                                    <Input placeholder='Enter Location...'

                                        onChange={(val) => {
                                            setLocation(val.target.value);

                                        }} style={{ borderColor: "black", borderWidth: "2px" }}
                                    />

                                </Form.Item>
                                <Form.Item
                                    name="mood"
                                    label="Mood"
                                >
                                    <Input placeholder='Enter Mood...'

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
                                    <Button type="link" htmlType="submit" style={{ backgroundColor: "#FBB117", fontWeight: "bold", borderRadius: "13px", borderColor: "#151B54", borderWidth: "2px", color: "#151B54" }} >
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
                                <Col span={2} />

                                <Form.Item
                                >
                                    <Link to="/dashboard">
                                        <Button type="primary" htmlType="submit" className='shareBtn' style={{ fontWeight: "bold", borderRadius: "13px", backgroundColor: "#9F000F", padding: "3px 20px 10px 20px", textAlign: "center", borderColor: "black", color: "#151B54", borderWidth: "2px" }} onClick={handleSubmit}>
                                            Delete
                                        </Button>
                                    </Link>
                                </Form.Item>
                            </Row>

                        </Form>
                    </Card>
                </div>

            </div>

        </>
    )
}

export default EditPost