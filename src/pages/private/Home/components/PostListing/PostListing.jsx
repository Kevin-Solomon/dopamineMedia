import React, { useEffect } from 'react';
import { usePost, useAuth, useFollowers } from '../../../../../context';
import { useSelector, useDispatch } from 'react-redux';
import Post from './../../../../../components/Post/Post';
import { Box } from '@chakra-ui/react';
import { getAllPost } from '../../../../../feature/post/postSlice';
import FollowerList from '../FollowerList/FollowerList';
function PostListing() {
  const dispatch = useDispatch();
  const { followers } = useSelector(state => state.followers);
  const { post, loading, error } = useSelector(state => state.post);
  const { user } = useSelector(state => state.auth);
  const userPost = post.filter(post => post.username === user.username);
  const postList = post.filter(post => followers.includes(post.username));

  useEffect(() => {
    dispatch(getAllPost());
  }, [user.token]);
  return (
    <Box d="flex" gap="0.5rem">
      <Box
        margin="3rem auto"
        d="flex"
        w="500px"
        flexDirection="column"
        gap="1rem"
      >
        {[...userPost, ...postList].map(
          ({ username, likes, content, _id, img }) => (
            <Post
              key={_id}
              username={username}
              likes={likes}
              content={content}
              img={img}
              _id={_id}
            />
          )
        )}
      </Box>
      <FollowerList />
    </Box>
  );
}

export default PostListing;
