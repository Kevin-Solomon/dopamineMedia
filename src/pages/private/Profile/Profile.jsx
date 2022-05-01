import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Text,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
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
      <Box padding="0.8rem" maxW="800px" margin="4rem auto">
        <Box d="flex" gap="3rem">
          <Avatar size="2xl" />
          <Box d="flex" gap="1rem" flexDirection="column">
            <Text fontSize="2xl">{user.username}</Text>
            <Box d="flex" gap="1rem">
              <Box as="span" d="flex" gap="3px">
                <Text fontWeight="900">{user.followers.length}</Text>followers
              </Box>
              <Box as="span" d="flex" gap="3px">
                <Text fontWeight="700">{user.following.length} </Text>following
              </Box>
            </Box>
            <Text>{`${user.firstName} ${user.lastName}`}</Text>
            <Text>{user.bio}</Text>
          </Box>
        </Box>
        <Divider marginTop="10px" color="black" />
        <Tabs isFitted variant="enclosed" marginTop="1rem">
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Bookmark</Tab>
            <Tab>Tagged</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default Profile;
