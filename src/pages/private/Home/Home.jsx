import { Box } from '@chakra-ui/react';
import Navbar from '../../../components/Navbar/Navbar';
import React from 'react';
import PostListing from './components/PostListing/PostListing';

function Home() {
  return (
    <Box backgroundColor="#fafafa">
      <Navbar />
      <PostListing />
    </Box>
  );
}

export default Home;
