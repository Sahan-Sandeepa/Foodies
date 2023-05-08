import { Form, Input, Button, Row, Col, Card, Avatar, Typography } from 'antd'; // Import Avatar component from antd
import '../../Assets/styles/style.css'
import { Link } from 'react-router-dom';
import {
    BankTwoTone,
    UserOutlined,
    MessageOutlined,
    LineChartOutlined,
    NotificationOutlined,
    LogoutOutlined,
    SyncOutlined,
    CarFilled
} from "@ant-design/icons"

const { Text } = Typography;

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};


// function getAllEventDetails() {
//     axios
//         .get("http://localhost:8095/user")
//         .then((res) => {
//             console.log(res);
//             setAllEventDetails(res.data.Event);
//         })
//         .catch(() => {
//             alert("Check The Connectivity");
//         });
// }
// // console.log(eventDetails);
// useEffect(() => getAllEventDetails(), []);

const Profile = () => {
    return (
        <>
            <div className='login' style={{
                backgroundSize: "cover",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', // ensure the background covers the entire height of the viewport
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'


            }}>
                <br></br>
                <br></br><br></br><br></br>
                <div>
                    {/* <Row> */}
                    <div style={{ padding: 1 }}>
                        <Col span={6} />
                        <Card class="card1" style={{ width: 900, backgroundColor: "#DFD5F9", borderRadius: 5, borderColor: "red" }}>
                            <Row>
                                <Row>
                                    <Col span={4}>
                                        <div style={{ textAlign: 'center', marginBottom: '16px', paddingTop: 20, paddingLeft: 50 }}>
                                            <Avatar size={90} icon={<UserOutlined />} /> {/* You can replace the UserOutlined icon with the actual profile picture retrieved */}
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <div style={{ paddingLeft: 200 }}>
                                            <h2>Username</h2>

                                            <Text strong style={{ paddingLeft: 20 }}>name</Text>
                                            <div style={{ paddingLeft: 20 }}>bio</div>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <div style={{ paddingLeft: 250, paddingTop: 25 }}>
                                            <Button>Edit Profile</Button>
                                        </div>
                                    </Col>
                                </Row>

                                <br></br><br></br><br></br><br></br>
                                <br></br><br></br><br></br>

                                <Row gutter={40}>
                                    <Col span={8}>
                                        <Card bordered={false}>
                                            Card content
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title="Card title" bordered={false}>
                                            Card content
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title="Card title" bordered={false}>
                                            Card content
                                        </Card>
                                    </Col>
                                </Row>
                            </Row>
                        </Card>
                        {/* </Row> */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile