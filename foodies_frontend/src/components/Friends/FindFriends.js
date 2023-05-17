import React, { useEffect, useState } from 'react';
import { List, Avatar, Button ,Card} from 'antd';
import axios from 'axios';


const Friends = () => {

  const [friends, setFriends] = useState([]);
  const [followStatus, setFollowStatus] = useState({});
  const handleFollow = (friendId) => {
    setFollowStatus((prevState) => ({
      ...prevState,
      [friendId]: true,
    }));
  };

  const handleUnfollow = (friendId) => {
    setFollowStatus((prevState) => ({
      ...prevState,
      [friendId]: false,
    }));
  };

  useEffect(() => {
    fetchFriends();
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
    <Card>
    <List
        itemLayout="horizontal"
        dataSource={friends}
        renderItem={(item) => (
          <List.Item
            actions={[
              followStatus[item.id] ? ( // Check if friend is followed
                <Button type="primary" shape="round" onClick={() => handleUnfollow(item.id)}>
                  Unfollow
                </Button>
              ) : (
                <Button type="primary" shape="round" onClick={() => handleFollow(item.id)}>
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
        )}
      />
    </Card>
      

    </>

  )
}

export default Friends;