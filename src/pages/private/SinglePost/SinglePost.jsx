import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getPost() {
      const response = await axios({
        method: 'GET',
        url: `/api/posts/${postId}`,
      });
      console.log(response);
    }
    getPost();
  }, []);
  return (
    <Box>
      <Navbar />
      <Box>
        <Box></Box>
        <Box>
          {img === '' ? null : <Image />}
          <Comments />
        </Box>
      </Box>
    </Box>
  );
}

export default SinglePost;
