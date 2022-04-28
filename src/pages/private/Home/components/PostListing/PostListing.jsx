import React, { useEffect } from 'react';
import { usePost, useAuth } from '../../../../../context';
import Post from './../../../../../components/Post/Post';
import { Box } from '@chakra-ui/react';
function PostListing() {
  const { postState } = usePost();
  console.log(postState, 'in listing');
  const { authState } = useAuth();
  console.log(postState.posts.map(post => <div>{post._id}</div>));
  return (
    <Box marginTop="3rem">
      {postState.posts.map(post => (
        <Post>{post._id}</Post>
      ))}
    </Box>
  );
}

export default PostListing;
