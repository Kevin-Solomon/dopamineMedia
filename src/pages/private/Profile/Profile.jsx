import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  AvatarBadge,
  Image,
} from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
import { postUser } from '../../../service/postUser';
import { useSelector, useDispatch } from 'react-redux';
import { getIcons } from '../../../util/getIcons';
import Post from '../../../components/Post/Post';
import {
  addFollowers,
  removeFromFollowers,
} from './../../../feature/followers/followerSlice';
import { editUserDetails } from './../../../feature/auth/authSlice';
import { Link } from '@chakra-ui/react';
function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    portfolio: '',
    img: '',
  });
  const [editUser, setEditUser] = useState({
    ...user,
  });

  const { userId } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/users/${userId}`,
        });
        setUser(prevPost => ({ ...prevPost, ...response.data.user }));
        setEditUser(prevPost => ({ ...prevPost, ...response.data.user }));
      } catch (err) {
        navigate('*');
      }
    };
    getUser();
  }, [userId, followers.followers, auth.token, auth.user]);
  const getIndex = () => {
    if (location.pathname.includes('bookmark')) return 1;
    if (location.pathname.includes('tagged')) return 0;
    return 0;
  };
  const bookmarkPost = post.post.filter(val => {
    return bookmark.bookmark.includes(val._id);
  });
  const likePost = post.post.map(post =>
    post.likes.likedBy.filter(user => user.username === auth.user.username)
  );
  return (
    <Box>
      <Navbar />
      <Box padding="0.8rem" maxW="800px" margin="4rem auto">
        <Box d="flex" gap={isLessThan640 ? '1rem' : '3rem'}>
          <Avatar
            src={user.img}
            size={isLessThan640 ? 'xl' : '2xl'}
            name={user.username}
          />
          <Box d="flex" gap="1rem" flexDirection="column">
            <Box d="flex" alignItems="center" gap="1rem">
              <Text fontSize="2xl">{user.username}</Text>
              {auth.user._id === userId ? (
                <Box onClick={onOpen}>{getIcons('EDIT', '27px')}</Box>
              ) : null}
              {auth.user._id !== userId ? (
                followers.followers.includes(user.username) ? (
                  <Button
                    bg="red.600"
                    color="white"
                    onClick={() => {
                      dispatch(
                        removeFromFollowers({ _id: userId, token: auth.token })
                      );
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    bg="red.600"
                    color="white"
                    onClick={() => {
                      dispatch(
                        addFollowers({ _id: userId, token: auth.token })
                      );
                    }}
                  >
                    Follow
                  </Button>
                )
              ) : null}
            </Box>

            <Box d="flex" gap="1rem">
              <Box as="span" d="flex" gap="3px">
                <Text fontWeight="900">{user.posts}</Text>posts
              </Box>
              <Box as="span" d="flex" gap="3px">
                <Text fontWeight="900">{user.followers.length}</Text>
                followers
              </Box>
              <Box as="span" d="flex" gap="3px">
                <Text fontWeight="700">{user.following.length} </Text>
                following
              </Box>
            </Box>
            <Text>{`${user.firstName} ${user.lastName}`}</Text>
            <Text>{auth.user.bio}</Text>
            <Link href={user.portfolio} color="blue.500" isExternal>
              {auth.user.portfolio}
            </Link>
          </Box>
        </Box>
        <Divider marginTop="10px" color="black" />
        <Tabs defaultIndex={getIndex()} isFitted marginTop="1rem">
          <TabList>
            <Tab>Posts</Tab>
            {auth.user.username === user.username ? <Tab>Bookmark</Tab> : null}
          </TabList>

          <TabPanels>
            {user.username === auth.user.username ? (
              <TabPanel>
                {auth.user.post.length === 0 ? (
                  <Box d="flex" justifyContent="center">
                    <Box>
                      <Text fontSize="xl" my="2">
                        Please Try Posting something !!
                      </Text>
                      <Image src="https://media4.giphy.com/media/KMcZ9XZeQIks8/giphy.gif?cid=790b76119b164caec294ccc5ada06f71cd756f9936b58ed5&rid=giphy.gif&ct=g" />
                    </Box>
                  </Box>
                ) : (
                  auth.user.post.map(
                    ({ username, likes, content, _id, img, comments }) => {
                      console.log(likes);
                      return (
                        <Post
                          comments={comments}
                          key={_id}
                          username={username}
                          likes={likes}
                          content={content}
                          img={img}
                          _id={_id}
                        />
                      );
                    }
                  )
                )}
              </TabPanel>
            ) : (
              <TabPanel>
                {post.post
                  .filter(post => post.username === user.username)
                  .map(({ username, likes, content, _id, img, comments }) => (
                    <Post
                      comments={comments}
                      key={_id}
                      username={username}
                      likes={likes}
                      content={content}
                      img={img}
                      _id={_id}
                    />
                  ))}
              </TabPanel>
            )}
            {user.username === auth.user.username ? (
              <TabPanel>
                {bookmarkPost.map(
                  ({ username, likes, content, _id, img, comments }) => (
                    <Post
                      comments={comments}
                      key={_id}
                      username={username}
                      likes={likes}
                      content={content}
                      img={img}
                      _id={_id}
                    />
                  )
                )}
              </TabPanel>
            ) : null}
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box d="flex" flexDirection="column" gap="3">
              <Avatar size="xl" src={editUser.img}>
                <AvatarBadge
                  position="absolute"
                  top="-20px"
                  right="-5px"
                  boxSize="1.25em"
                  bg="red.500"
                >
                  {getIcons('CANCEL', '27px')}
                </AvatarBadge>
                <FormLabel
                  top="40%"
                  left="15%"
                  position="absolute"
                  htmlFor="profile-img"
                >
                  Change
                </FormLabel>
                <Input
                  onChange={e => {
                    e.preventDefault();
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = e => {
                      e.preventDefault();
                      setEditUser(prevPost => ({
                        ...prevPost,
                        img: reader.result,
                      }));
                    };
                  }}
                  display="none"
                  id="profile-img"
                  type="file"
                />
              </Avatar>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  my="1"
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
                  my="1"
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
                  my="1"
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
                  my="1"
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
                <FormLabel htmlFor="portfolio">Portfolio</FormLabel>
                <Input
                  my="1"
                  name="portfolio"
                  id="portfolio"
                  placeholder="portfolio"
                  value={editUser.portfolio}
                  onChange={e => {
                    setEditUser(prev => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={e => {
                e.preventDefault();
                dispatch(
                  editUserDetails({ userData: editUser, token: auth.token })
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
