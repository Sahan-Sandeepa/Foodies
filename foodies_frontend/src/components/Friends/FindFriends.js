import React, { useEffect, useState } from 'react';
import { List, Col, Button, Card, notification, Row } from 'antd';
import axios from 'axios';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [followStatus, setFollowStatus] = useState({});

  const openNotification = (message) => {
    notification.open({
      message: 'Notification',
      description: message,

    });
  };

  const handleFollow = (friendId, friendName) => {
    setFollowStatus((prevState) => ({
      ...prevState,
      [friendId]: true,
    }));
    localStorage.setItem('followStatus', JSON.stringify({ ...followStatus, [friendId]: true }));
    openNotification(`You followed ${friendName}`);
  };

  const handleUnfollow = (friendId, friendName) => {
    setFollowStatus((prevState) => ({
      ...prevState,
      [friendId]: false,
    }));
    localStorage.setItem('followStatus', JSON.stringify({ ...followStatus, [friendId]: false }));
    openNotification(`You unfollowed ${friendName}`);
  };

  useEffect(() => {
    fetchFriends();
    const storedFollowStatus = localStorage.getItem('followStatus');
    if (storedFollowStatus) {
      setFollowStatus(JSON.parse(storedFollowStatus));
    }
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get('http://localhost:8095/users/'); // Replace with your API endpoint
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  return (
    <>
      <Row>
        <Col span={5} />
        <Card style={{ width: 800,padding:20 }}>
          <List
            itemLayout="horizontal"
            dataSource={friends}
            renderItem={(item) => {
              console.log(item); // Log the item object to check its structure
              return (
                <List.Item
                  actions={[
                    followStatus[item.id] ? (
                      <Button type="primary" shape="round" onClick={() => handleUnfollow(item.id, item.name)}>
                        Unfollow
                      </Button>
                    ) : (
                      <Button type="primary" shape="round" onClick={() => handleFollow(item.id, item.name)}>
                        Follow
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    avatar={
                      <img
                        src={item.imageUrl}
                        alt="Friend"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    }
                  />
                </List.Item>
              );
            }}
          />
        </Card>

      </Row>

    </>
  );
};

export default Friends;
