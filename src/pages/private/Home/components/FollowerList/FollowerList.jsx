import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth, useFollowers } from '../../../../../context';
import axios from 'axios';
import UserCard from '../../../../../components/UserCard/UserCard';
function FollowerList() {
  const { followerState } = useFollowers();
  const { authState } = useAuth();
  const [suggestedFollowers, setSuggestedFollowers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const response = await axios({ method: 'GET', url: '/api/users' });
      setSuggestedFollowers(
        response.data.users
          .filter(user => !followerState.includes(user.username))
          .filter(user => user.username !== authState.user.username)
      );
    }
    getUsers();
  }, [authState.token, followerState]);
  return (
    <Box position="sticky" top="100px" height="100px">
      <Heading as="h5" size="sm" marginBottom="1rem">
        Suggested Followers
      </Heading>
      <Box d="flex" flexDirection="column" gap="10px">
        {suggestedFollowers.map(user => {
          return <UserCard username={user.username} _id={user._id} />;
        })}
      </Box>
    </Box>
  );
}

export default FollowerList;
