import React from 'react';
import { AvatarGroup, Avatar, Text, Box } from '@chakra-ui/react';
function LikedBy({ users }) {
  return (
    <Box d="flex" alignItems="center" gap="5px">
      <AvatarGroup size="sm" max={3}>
        {users.map(user => {
          return <Avatar name={user.username} />;
        })}
      </AvatarGroup>
      {users.map(user => {
        return (
          <Text>
            liked by {users[0].username}
            {users.length === 1 ? '' : `and ${users.length - 1}`}
          </Text>
        );
      })}
    </Box>
  );
}

export default LikedBy;
