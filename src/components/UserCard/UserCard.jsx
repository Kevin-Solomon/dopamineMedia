import React from 'react';
import { Box, Avatar, Button, Text, Heading } from '@chakra-ui/react';
import { addToFollowers } from './../../service';
import { useAuth, useFollowers } from '../../context';
import { Link } from 'react-router-dom';
function UserCard({ username, img, _id }) {
  const { followerState, followerDispatch } = useFollowers();
  const { authState } = useAuth();
  return (
    <Box
      d="flex"
      alignItems="center"
      gap="10px"
      w="20rem"
      justifyContent="space-between"
    >
      <Box d="flex" gap="10px" alignItems="center">
        <Link to={`/${_id}`}>
          <Avatar size="sm" name={username} />
        </Link>

        <Link to={`/${_id}`}>
          <Text>{username}</Text>
        </Link>
      </Box>
      <Box order="1">
        <Button
          onClick={() => {
            addToFollowers(_id, authState.token, followerDispatch);
          }}
          variant="ghost"
        >
          Follow
        </Button>
      </Box>
    </Box>
  );
}

export default UserCard;
