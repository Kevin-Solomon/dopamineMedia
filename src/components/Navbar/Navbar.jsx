import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { getIcons } from '../../util/getIcons';
function Navbar() {
  return (
    <Box
      bg="#ffffff"
      w="100%"
      color="black"
      position="fixed"
      top="0px"
      right="0px"
      paddingTop="1rem"
      zIndex="1"
      border="1px solid #dbdbdb"
      padding="10px"
    >
      <Box width="60%" margin="0 auto" d="flex" justifyContent="space-between">
        <Text>This is the Box</Text>
        <Box d="flex" gap="1rem">
          <Box>{getIcons('OUTLINE_HOME', '27px')}</Box>
          <Box>{getIcons('ADD_OUTLINE', '27px')}</Box>
          <Box>{getIcons('EXPLORE_OUTLINE', '27px')}</Box>
          <Box>{getIcons('OUTLINE_HEART', '27px')}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
