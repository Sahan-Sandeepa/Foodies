import React from 'react'
import { Button, Form, Input, Card, Modal, Upload, Col, Row, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from "axios";
import '../../Assets/styles/style.css'
import { Link } from 'react-router-dom';
import '../../Assets/styles/style.css'



const { TextArea } = Input;

const onFinish = (values) => {
    console.log(values);
};

const Post = () => {



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



        // create a FormData object to store the form data, including the images
        const formData = new FormData();



        // add the caption, mood, and location fields to the formData object
        formData.append("caption", caption);
        formData.append("mood", mood);
        formData.append("location", location);



        // loop through each selected file and add it to the formData object
        for (let i = 0; i < postImage.length; i++) {
            formData.append("postImage", postImage[i]);
        }



        axios
            .post("http://localhost:8095/post/create", formData)
            .then(() => {
                // handle successful post creation
            })
            .catch((err) => {
                alert(err);
            });
    };

    const [numLikes, setNumLikes] = useState(
        parseInt(localStorage.getItem('numLikes')) || 0
    );

    const [liked, setLiked] = useState(parseInt(localStorage.getItem('numLikes')) !== 0);


    function handleLike() {
        let newNumLikes;
        if (liked) {
            newNumLikes = numLikes - 1;
            setNumLikes(newNumLikes);
            localStorage.setItem('numLikes', newNumLikes);
        } else {
            newNumLikes = numLikes + 1;
            setNumLikes(newNumLikes);
            localStorage.setItem('numLikes', newNumLikes);
        }
        setLiked(!liked);
    }


    function handleUnlike() {
        const newNumLikes = numLikes - 1;
        setNumLikes(newNumLikes);
        localStorage.setItem('numLikes', newNumLikes);
        setLiked(false);
    }





    return (
        <>
        
        <div className='login' style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'


      }}>
            {/* <div style={{ backgroundColor: "#D1D0CE", padding: "30px" }}> */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <Card class="card1" style={{ width: 800, backgroundColor: "white", borderRadius: 5, borderColor: "red" }}>
                        <h1 style={{ fontSize: "27px", fontFamily: "fantasy", color: "#191970", textAlign: "center" }}>Add Post</h1>
                        <Form
                            onFinish={onFinish}
                            style={{
                                maxWidth: 1000, padding: 2, paddingLeft: 120
                            }}


                        >
                            <br></br>
                            <br></br>
                            <Row gutter={[48, 16]}>
                                <Form.Item label="Story Image" name="image" >
                                    <div> <input type="file" onChange={handleImageInputChange} multiple />
                                        {postImage && postImage.map(image => <img src={image} alt="Selected Image" style={{ width: 150 }} />)}
                                    </div> </Form.Item>

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
                                <Col span={3}/>
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
                                    <Button type="link" htmlType="submit" style={{ backgroundColor: "#9F000F", color: "white", fontWeight: "bold", borderRadius: "13px", borderColor: "#151B54", borderWidth: "2px", color: "#151B54" }} >
                                        Discard
                                    </Button>
                                </Form.Item>
                                <Col span={2} />
                                <Form.Item

                                >
                                    <Link to="/dashboard">
                                        <Button type="primary" htmlType="submit" className='shareBtn' style={{ fontWeight: "bold", borderRadius: "13px", backgroundColor: "#32CD32", padding: "3px 20px 10px 20px", textAlign: "center", borderColor: "black", color: "#151B54", borderWidth: "2px" }} onClick={handleSubmit}>
                                            Share
                                        </Button>
                                    </Link>
                                </Form.Item>
                            </Row>

                        </Form>
                    </Card>
                {/* </div> */}

            </div>

            </div>

        </>
    )
}

export default Post