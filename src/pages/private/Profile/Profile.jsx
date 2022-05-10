import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { getIcons } from '../../../util/getIcons';
import Post from '../../../components/Post/Post';
import { removeFromFollow, addToFollowers } from './../../../service';
function Profile() {
  const { post } = useSelector(state => state);
  const { bookmark } = useSelector(state => state);
  const { auth } = useSelector(state => state);
  const { followers } = useSelector(state => state);
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLessThan640] = useMediaQuery('(max-width:640px)');
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
      setUser(prevPost => ({ ...prevPost, ...response.data.user }));
      setEditUser(prevPost => ({ ...prevPost, ...response.data.user }));
    };
    getUser();
  }, [userId]);
  const getIndex = () => {
    if (location.pathname.includes('bookmark')) return 1;
    if (location.pathname.includes('tagged')) return 0;
    return 0;
  };
  const bookmarkPost = post.post.filter(val =>
    bookmark.bookmark.includes(val._id)
  );
  return (
    <Box>
      <Navbar />
      <Box padding="0.8rem" maxW="800px" margin="4rem auto">
        <Box d="flex" gap={isLessThan640 ? '1rem' : '3rem'}>
          <Avatar size={isLessThan640 ? 'xl' : '2xl'} name={user.username} />
          <Box d="flex" gap="1rem" flexDirection="column">
            <Box d="flex" alignItems="center" gap="1rem">
              <Text fontSize="2xl">{user.username}</Text>
              {auth.user._id === userId ? (
                <Box onClick={onOpen}>{getIcons('EDIT', '27px')}</Box>
              ) : null}
              {followers.followers.includes(user.username) ? (
                <Button
                  bg="red.600"
                  color="white"
                  onClick={() => {
                    removeFromFollow(userId, auth.token, followerDispatch);
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  bg="red.600"
                  color="white"
                  onClick={() => {
                    addToFollowers(userId, auth.token, followerDispatch);
                  }}
                >
                  Follow
                </Button>
              )}
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
        <Tabs defaultIndex={getIndex()} isFitted marginTop="1rem">
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
              {bookmarkPost.map(({ username, likes, content, _id, img }) => (
                <Post
                  key={_id}
                  username={username}
                  likes={likes}
                  content={content}
                  img={img}
                  _id={_id}
                />
              ))}
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
