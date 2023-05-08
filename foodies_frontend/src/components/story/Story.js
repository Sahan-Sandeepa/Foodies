import React from 'react'
import { Button, Form, Input, Card, Modal, Upload, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";




const onFinish = (values) => {
    console.log(values);
};
const Story = props => {
    const { isOpen, handleCancel, handleOk, selectedItem } = props;
    const [refesh, seRefesh] = useState(false);
    const [caption, setCaption] = useState("");
    const [image, setBase64Image] = useState("");

    const navigate = useNavigate();


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
        const story = {
            caption,
            image,

        };

        axios
            .post("http://localhost:8095/story/create", story)
            .then(() => {
                navigate("/home");

            })
            .catch((err) => {
                alert(err);
                console.log(story)
            });

    }


    return (
        <>
       
            <div className='login' style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'


      }}>
        
                <div style={{ paddingLeft: 50 }}>
                    <Card style={{ width: 500, backgroundColor: "whitesmoke", borderRadius: 5, borderColor: "red" }}>
                        <Form
                            onFinish={onFinish}
                            style={{
                                maxWidth: 600
                            }}
                        >
                            <Form.Item
                                label="Story Image"
                                name="image"

                            >
                                <div>
                                    <input type="file" onChange={handleImageInputChange} />
                                    {image && <img src={image} alt="Selected Image" style={{ width: 50 }} />}
                                </div>


                            </Form.Item>

                            <Form.Item
                                name="caption"
                                label="Caption"
                                value={caption}
                            >
                                <Input
                                    value={caption}
                                    onChange={(val) => {
                                        setCaption(val.target.value);

                                    }}
                                />

                            </Form.Item>

                            <Col span={4} />
                            <Form.Item
                                style={{ paddingLeft: 280 }}
                            >
                                
                                <Button type="primary" htmlType="submit" onClick={handleSubmit} >
                                    Submit
                                </Button>
                               
                               
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
                </div>
        </>
    )
}

export default Story