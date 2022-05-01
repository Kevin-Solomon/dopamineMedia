import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Text, Divider } from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
function Profile() {
  const [user, setUser] = useState({
    username: 'adarshbalika',
    followers: [],
    following: [],
    bookmarks: [],
    firstName: 'Guest',
    lastName: 'User',
    name: 'Guest',
    bio: '',
  });
  const { userId } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios({
        method: 'GET',
        url: `/api/users/${userId}`,
      });
      console.log(response);
      setUser(response.data.user);
    };
    getUser();
  }, []);
  return (
    <Box>
      <Navbar />
      <Box padding="0.8rem" margin="4rem auto" maxW="800px" d="flex" gap="3rem">
        <Avatar size="2xl" />
        <Box d="flex" gap="1rem" flexDirection="column">
          <Text fontSize="2xl">{user.username}</Text>
          <Box d="flex" gap="1rem">
            <Box as="span" d="flex" gap="3px">
              <Text fontWeight="900">{user.followers.length}</Text>followers
            </Box>
            <Box as="span" d="flex" gap="3px">
              <Text fontWeight="900">{user.following.length} </Text>following
            </Box>
          </Box>
          <Text>{`${user.firstName} ${user.lastName}`}</Text>
          <Text>{user.bio}</Text>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}

export default Profile;
