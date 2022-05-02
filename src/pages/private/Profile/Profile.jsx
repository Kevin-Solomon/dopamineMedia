import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Box,
  Text,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useMediaQuery,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
import { postUser } from '../../../service/postUser';
import { useAuth } from '../../../context';
import { getIcons } from '../../../util/getIcons';

function Profile() {
  const { authState, authDispatch } = useAuth();
  console.log(authState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLessThan640] = useMediaQuery('(max-width:640px)');
  console.log(isLessThan640);
  const [user, setUser] = useState({
    username: 'adarshbalika',
    followers: [],
    following: [],
    bookmarks: [],
    firstName: 'Guest',
    lastName: 'User',
    bio: '',
    posts: 0,
  });
  const [editUser, setEditUser] = useState({
    ...user,
  });
  const { userId } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios({
        method: 'GET',
        url: `/api/users/${userId}`,
      });
      console.log(response);
      setUser(prevPost => ({ ...prevPost, ...response.data.user }));
      setEditUser(prevPost => ({ ...prevPost, ...response.data.user }));
    };
    getUser();
  }, []);
  return (
    <Box>
      <Navbar />
      <Box padding="0.8rem" maxW="800px" margin="4rem auto">
        <Box d="flex" gap={isLessThan640 ? '1rem' : '3rem'}>
          <Avatar size={isLessThan640 ? 'xl' : '2xl'} name={user.username} />
          <Box d="flex" gap="1rem" flexDirection="column">
            <Box d="flex" alignItems="center" gap="1rem">
              <Text fontSize="2xl">{user.username}</Text>
              <Box onClick={onOpen}>{getIcons('EDIT', '27px')}</Box>
            </Box>

            <Box d="flex" gap="1rem">
              <Box as="span" d="flex" gap="3px">
                <Text fontWeight="900">{user.posts}</Text>posts
              </Box>
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
        <Tabs defaultIndex={0} isFitted marginTop="1rem">
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Bookmark</Tab>
            <Tab>Tagged</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>All of the post</p>
            </TabPanel>
            <TabPanel>
              <p>Bookmarked Post</p>
            </TabPanel>
            <TabPanel>
              <p>Tagged Posts</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                name="username"
                id="username"
                placeholder="Username"
                value={editUser.username}
                onChange={e => {
                  setEditUser(prev => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={editUser.firstName}
                onChange={e => {
                  setEditUser(prev => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={editUser.lastName}
                onChange={e => {
                  setEditUser(prev => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <Input
                name="bio"
                id="bio"
                placeholder="Bio"
                value={editUser.bio}
                onChange={e => {
                  setEditUser(prev => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={e => {
                e.preventDefault();
                postUser(
                  authState.token,
                  editUser,
                  setUser,
                  setEditUser,
                  authDispatch
                );

                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Save Details
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Profile;
