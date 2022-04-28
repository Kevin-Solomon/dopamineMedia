import {
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Textarea,
  Avatar,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { getIcons } from '../../util/getIcons';

function Post() {
  console.log('in post');
  return (
    <Box maxW="100%">
      <Box d="flex" justifyContent="space-between" flexDirection="column">
        <Box d="flex" justifyContent="space-between">
          <Box>
            <Avatar
              size="sm"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            />
            <Text>Creator</Text>
          </Box>

          <Box>{getIcons('THREE_DOTS', '27px')}</Box>
        </Box>

        <Textarea placeholder="Here is a sample placeholder" />
        <Box d="flex" justifyContent="space-between">
          <Box d="flex">
            {getIcons('OUTLINE_HEART', '27px')}
            {getIcons('COMMENT', '27px')}
          </Box>
          <Box>{getIcons('BOOKMARK', '27px')}</Box>
        </Box>
        <Text>15 likes</Text>
        <InputGroup size="md">
          <Input pr="4.5rem" placeholder="Add a comment..." />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
}

export default Post;
