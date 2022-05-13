import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Avatar,
  Text,
  useDisclosure,
  Image,
  useToast,
  Skeleton,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
import { getIcons } from '../../../util/getIcons';
import ShareModal from '../../../components/ShareModal/ShareModal';
import { useSelector, useDispatch } from 'react-redux';
import { addToLike, deleteFromLike } from './../../../feature/post/postSlice';
import {
  deleteBookmark,
  addBookmark,
} from './../../../feature/bookmark/bookmarkSlice';
function SinglePost() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postId } = useParams();
  const { post } = useSelector(state => state.post);
  const { user, token } = useSelector(state => state.auth);
  const { bookmark } = useSelector(state => state.bookmark);
  const dispatch = useDispatch();
  const [currPost, setPost] = useState({
    key: '',
    username: '',
    likes: [],
    content: '',
    img: '',
    _id: '',
    comments: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getPost() {
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `/api/posts/${postId}`,
      });
      setLoading(false);
      setPost(response.data.post);
    }
    getPost();
  }, [bookmark, post]);
  console.log(loading);
  return (
    <Box>
      <Navbar />
      <Box mt={16}>
        {loading && (
          <Box h="100vh" w="100vw" position="fixed" bg="#fff" opacity="0.5">
            <Spinner
              color="red.500"
              size="xl"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
            />
          </Box>
        )}
        <Box d="flex" flexDirection="column" maxW="30rem" margin="0 auto">
          <Box d="flex" alignItems="center" gap="2" w="100%">
            <Avatar size="sm" name={currPost.username} />
            <Text>{currPost.username}</Text>
          </Box>
          {currPost.img === '' ? null : <Image />}
          <Box>{currPost.content}</Box>
          <Box d="flex" justifyContent="space-between" my={4}>
            <Box d="flex" gap={2}>
              <Box>
                {currPost?.likes?.likedBy?.some(
                  users => users.username === user.username
                ) ? (
                  <Box
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(deleteFromLike({ _id: currPost._id, token }));
                      toast({
                        title: 'You no longer like this post',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    {getIcons('LIKE_FILL', '27px')}
                  </Box>
                ) : (
                  <Box
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(addToLike({ _id: currPost._id, token }));
                      toast({
                        title: 'You liked this post',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    {getIcons('OUTLINE_HEART', '27px')}
                  </Box>
                )}
              </Box>
              <Box>
                {bookmark.includes(currPost._id) ? (
                  <Box
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(deleteBookmark({ _id: currPost._id, token }));
                      toast({
                        title: 'This post has been removed from bookmarks',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    {getIcons('BOOKMARK_FILL', '27px')}
                  </Box>
                ) : (
                  <Box
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(addBookmark({ _id: currPost._id, token }));
                      toast({
                        title: 'Moved post to bookmark',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    {' '}
                    {getIcons('BOOKMARK', '27px')}
                  </Box>
                )}
              </Box>
            </Box>

            <Box onClick={onOpen}>{getIcons('SHARE', '27px')}</Box>
          </Box>
          <ShareModal isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
    </Box>
  );
}

export default SinglePost;
