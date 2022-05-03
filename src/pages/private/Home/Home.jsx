import { Box } from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
import React from 'react';
import PostListing from './components/PostListing/PostListing';
import FollowerList from './components/FollowerList/FollowerList';

function Home() {
  return (
    <Box backgroundColor="#fafafa">
      <Navbar />
      <Box d="flex" justifyContent="center">
        <PostListing />
      </Box>
    </Box>
  );
}

export default Home;
