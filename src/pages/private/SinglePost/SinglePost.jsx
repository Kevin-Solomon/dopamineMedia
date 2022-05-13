import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Avatar, Text, useDisclosure, Image } from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
import { getIcons } from '../../../util/getIcons';
import ShareModal from '../../../components/ShareModal/ShareModal';

function SinglePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postId } = useParams();
  const [post, setPost] = useState({
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
  }, []);
  return (
    <Box>
      <Navbar />
      <Box mt={16}>
        <Box d="flex" flexDirection="column" maxW="30rem" margin="0 auto">
          <Box d="flex" alignItems="center" gap="2" w="100%">
            <Avatar size="sm" name={post.username} />
            <Text>{post.username}</Text>
          </Box>
          {post.img === '' ? null : <Image />}
          <Box>{post.content}</Box>
          <Box d="flex" justifyContent="space-between" my={4}>
            <Box d="flex" gap={2}>
              <Box>{getIcons('OUTLINE_HEART', '27px')}</Box>
              <Box>{getIcons('BOOKMARK', '27px')}</Box>
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
