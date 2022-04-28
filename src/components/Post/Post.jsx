import { Textarea } from '@chakra-ui/react';
import React from 'react';
import { getIcons } from '../../util/getIcons';

function Post() {
  return (
    <Box>
      <Box d="flex" justifyContent="space-between">
        <Box>
          <Avatar
            size="sm"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
          Creator Name
        </Box>
        <Box>{getIcons('THREE_DOTS', '27px')}</Box>
        <Textarea placeholder="Here is a sample placeholder" />
        <Box>
          <Box>
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
