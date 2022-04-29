import React, { useEffect } from 'react';
import { usePost, useAuth } from '../../../../../context';
import Post from './../../../../../components/Post/Post';
import { Box } from '@chakra-ui/react';
function PostListing() {
  const { postState } = usePost();

  const { authState } = useAuth();

  return (
    <Box
      margin="3rem auto"
      d="flex"
      maxW="800px"
      flexDirection="column"
      gap="1rem"
    >
      {postState.posts.map(({ username, likes, content, _id, img }) => (
        <Post
          key={_id}
          username={username}
          likes={likes}
          content={content}
          img={img}
          _id={_id}
        />
      ))}
    </Box>
  );
}

export default PostListing;
