import React, { useEffect } from 'react';
import { usePost, useAuth, useFollowers } from '../../../../../context';
import { useSelector } from 'react-redux';
import Post from './../../../../../components/Post/Post';
import { Box } from '@chakra-ui/react';
import FollowerList from '../FollowerList/FollowerList';
function PostListing() {
  const { postState } = usePost();
  const { followerState } = useFollowers();
  const { post, loading, error } = useSelector(state => state.post);
  console.log(post);
  const { authState } = useAuth();
  const userPost = post.filter(
    post => post.username === authState.user.username
  );
  const postList = post.filter(post => followerState.includes(post.username));

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
