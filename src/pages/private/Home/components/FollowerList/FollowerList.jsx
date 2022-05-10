import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import UserCard from '../../../../../components/UserCard/UserCard';
function FollowerList() {
  const { followers } = useSelector(state => state.followers);
  const { user } = useSelector(state => state.auth);
  console.log(user.username);
  const [suggestedFollowers, setSuggestedFollowers] = useState([]);
  console.log(suggestedFollowers);
  useEffect(() => {
    async function getUsers() {
      const response = await axios({ method: 'GET', url: '/api/users' });
      console.log(
        response.data.users.filter(users => {
          console.log(users.username === user.username);
          users.username !== user.username;
        })
      );

      setSuggestedFollowers(
        response.data.users
          .filter(user => !followers.includes(user.username))
          .filter(users => users.username !== user.username)
      );
    }
    getUsers();
  }, [user.username, followers]);
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
