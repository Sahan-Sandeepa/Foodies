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

const EditPost = (props) => {
  const { isModalOpen, handleCancel, handleOk, selectedItem } = props;
  const [form] = useForm();

  const handleSubmit = (values) => {
    const PostSchema = {
      ...values,
    };
    axios
      .put("http://localhost:8095/post/update/" + selectedItem.id, PostSchema)
      .then(() => {
        alert("Updated!");
      })
      .catch((err) => {
        alert(err);
        console.log(PostSchema);
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
        width={900}
      >
        <div style={{ backgroundColor: "#D1D0CE", padding: "30px" }}>
          <h1
            style={{
              fontSize: "27px",
              fontFamily: "fantasy",
              color: "#191970",
              textAlign: "center",
            }}
          >
            Edit Post
          </h1>

          <br></br>
          <div style={{ backgroundColor: "#D1D0CE" }}>
            <Card
              class="card1"
              style={{
                width: 800,
                backgroundColor: "#C9C0BB",
                borderRadius: 5,
                borderColor: "red",
              }}
            >
              <Form
                onFinish={handleSubmit}
                form={form}
                style={{
                  maxWidth: 1000,
                  padding: 2,
                  paddingLeft: 120,
                }}
              >
                <br></br>
                <br></br>
                <Row gutter={[48, 16]}>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>

                  <Form.Item name="caption" label="Caption">
                    <TextArea
                      style={{ borderColor: "black", borderWidth: "2px" }}
                    />
                  </Form.Item>
                  <Form.Item name="location" label="Location">
                    <Input
                      style={{ borderColor: "black", borderWidth: "2px" }}
                    />
                  </Form.Item>
                  <Form.Item name="mood" label="Mood">
                    <Input
                      style={{ borderColor: "black", borderWidth: "2px" }}
                    />
                  </Form.Item>
                </Row>
                <br></br>
                <Row>
                  <Col span={9} />

                  <Form.Item>
                    <Button
                      type="link"
                      htmlType="submit"
                      style={{
                        backgroundColor: "red",
                        fontWeight: "bold",
                        borderRadius: "13px",
                        borderColor: "#151B54",
                        borderWidth: "2px",
                        color: "white",
                      }}
                      onClick={handleCancel}
                    >
                      Discard
                    </Button>
                  </Form.Item>
                  <Col span={2} />

                  <Form.Item>
                    <Button
                      type="link"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#004225",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "13px",
                        borderColor: "#151B54",
                        borderWidth: "2px",
                      }}
                    >
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
  );
};

export default EditPost;
