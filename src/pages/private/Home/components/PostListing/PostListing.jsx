import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './../../../../../components/Post/Post';

import { Box, useMediaQuery } from '@chakra-ui/react';
import { getQueryPost } from '../../../../../feature/post/postSlice';
import { incrementPage } from '../../../../../feature/post/postSlice';
import FollowerList from '../FollowerList/FollowerList';
import axios from 'axios';
function PostListing() {
  const dispatch = useDispatch();
  const { followers } = useSelector(state => state.followers);
  const { post, loading, error, totalPost, pageNumber } = useSelector(
    state => state.post
  );
  const [isLessThan1000] = useMediaQuery('(max-width:1000px)');
  const { user, token } = useSelector(state => state.auth);
  const userPost = post.filter(post => post.username === user.username);
  const postList = post.filter(post => followers.includes(post.username));
  useEffect(() => {
    if (post.length === 0) {
      dispatch(getQueryPost({ pageNumber }));
      return;
    }
    if (totalPost === post.length) return;
    if (pageNumber * 5 === post.length) return;
    dispatch(getQueryPost({ pageNumber }));
  }, [token, pageNumber]);
  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.body.offsetHeight
      ) {
        if (totalPost === post.length) return;
        if (Math.floor(post.length / 5) + 1 === pageNumber) return;
        dispatch(incrementPage());
      }
    };
  });
  return (
    <Box d="flex" gap="0.5rem">
      <Box
        margin="3rem auto"
        d="flex"
        w="500px"
        flexDirection="column"
        gap="1rem"
      >
        {post.map(({ username, likes, content, _id, img, comments }) => (
          <Post
            key={_id}
            username={username}
            likes={likes}
            content={content}
            img={img}
            _id={_id}
            comments={comments}
          />
        ))}
      </Box>
      {isLessThan1000 ? null : <FollowerList />}
    </Box>
  );
}

export default PostListing;
