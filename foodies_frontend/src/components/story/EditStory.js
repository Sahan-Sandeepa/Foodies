import React, { useEffect } from "react";
import {
    Button,
    Form,
    Input,
    Card,
    Modal,
    Upload,
    Col,
    Row,
    AutoComplete,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import "../../Assets/styles/style.css";
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;
const EditStory = props => {
    const { isModalOpen, handleCancel, handleOk, selectedItem } = props;
    const [form] = useForm();
    const [caption, setCaption] = useState("");
    const [image, setBase64Image] = useState("");

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
    const handleSubmit = (values) => {
        const StorySchema = {
            ...values,
        };
        axios
            .put("http://localhost:8095/story/update/" + selectedItem.id, StorySchema)
            .then(() => {
                alert("Updated!");
            })
            .catch((err) => {
                alert(err);
                console.log(StorySchema);
            });
    };

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);


    return (
        <>

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={null}
                width={550}
            >

                <div>
                    <Card style={{ width: 500, backgroundColor: "whitesmoke", borderRadius: 5, borderColor: "red" }}>
                        <Form
                            onFinish={handleSubmit}

                            style={{
                                maxWidth: 600
                            }}

                            form={form}

                        >
                            {/* <Form.Item
                                label="Story Image"
                                name="image"

                            >
                                <div>
                                    <input type="file" onChange={handleImageInputChange}  />
                                    {image && <img src={image} alt="Selected Image" style={{ width: 50 }} />}

                                </div>


                            </Form.Item> */}

                            <Form.Item
                                name="caption"
                                label="Caption"
                                value={caption}
                            >
                                <Input
                                    value={caption}

                                />

                            </Form.Item>
                            <Row>
                            <Col span={11} />
                            <Form.Item
                              
                            >

                                <Button style={{backgroundColor:"red", color:"white",fontWeight:"bold"}} htmlType="submit" onClick={handleCancel} >
                                    Cancel
                                </Button>


                            </Form.Item> <Col span={2} />
                            <Form.Item
                            >

                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>


                            </Form.Item>
                            </Row>

                           
                        </Form>
                    </Card>

                </div>
            </Modal>
        </>
    )

}

export default EditStory