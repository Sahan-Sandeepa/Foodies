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
    notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import "../../Assets/styles/style.css";
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

const CommentPage = props=> {
  const { isModalOpen, handleCancel, handleOk, selectedItem } = props;
  const [form] = useForm();
  const [comment, setCaption] = useState("");

  const handleSubmit = (values) => {
    const CommentSchema = {
      ...values,
    };
    axios
      .put("http://localhost:8095/comment/update/" + selectedItem.id, CommentSchema)
      .then(() => {
        notification.success({
          message: 'Updated Successful',
          description: 'You have successfully Updated Report',
        });
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
        console.log(CommentSchema);
      });
  };

  useEffect(() => {
    if (selectedItem) {
      console.log("commen-->" ,selectedItem)
      form.setFieldsValue(selectedItem);
    }
  }, [selectedItem]);
  return (
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
           

            <Form.Item
              name="comment"
              label="Comment"
              value={comment}
            >
              <Input
                value={comment}
              />

            </Form.Item>
            <Row>
              <Col span={11} />
              <Form.Item

              >

                <Button style={{ backgroundColor: "red", color: "white", fontWeight: "bold" }} htmlType="submit" onClick={handleCancel} >
                  Cancel
                </Button>


              </Form.Item> <Col span={2} />
              <Form.Item
              >

                <Button type="primary" htmlType="submit"  >
                  Submit
                </Button>


              </Form.Item>
            </Row>


          </Form>
        </Card>

      </div>
    </Modal>
  );
};

export default CommentPage;
