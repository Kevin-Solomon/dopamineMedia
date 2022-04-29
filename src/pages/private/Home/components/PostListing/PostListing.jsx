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
    <Box
      margin="3rem auto"
      d="flex"
      maxW="800px"
      flexDirection="column"
      gap="1rem"
      backgroundColor="#fafafa"
    >
      {postState.posts.map(({ username, likes, content, _id }) => (
        <Post key={_id} username={username} likes={likes} content={content} />
      ))}
    </Box>
  );
}

export default PostListing;
