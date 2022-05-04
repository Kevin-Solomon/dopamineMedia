import React, { useEffect } from 'react';
import { usePost, useAuth, useFollowers } from '../../../../../context';
import Post from './../../../../../components/Post/Post';
import { Box } from '@chakra-ui/react';
import FollowerList from '../FollowerList/FollowerList';
function PostListing() {
  const { postState } = usePost();
  const { followerState } = useFollowers();
  console.log(followerState);
  const { authState } = useAuth();
  const userPost = postState.posts.filter(
    post => post.username === authState.user.username
  );
  const postList = postState.posts.filter(post =>
    followerState.includes(post.username)
  );

  console.log(postList);
  return (
    <Box d="flex" gap="0.5rem">
      <Box
        margin="3rem auto"
        d="flex"
        maxW="600px"
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
