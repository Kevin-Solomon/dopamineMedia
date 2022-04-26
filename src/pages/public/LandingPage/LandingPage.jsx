import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import {
  Text,
  Box,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useMediaQuery,
} from '@chakra-ui/react';
function LandingPage() {
  const [isMobile] = useMediaQuery('(min-width: 768px)');
  console.log(isMobile);
  return (
    <Box d="flex" h="100vh">
      {isMobile ? (
        <Box minW="50%" d="flex" justifyContent="center">
          <Image
            objectFit="contain"
            src="https://i.pinimg.com/originals/f4/f3/73/f4f37379be88e2ca55bc10be8de48b71.gif"
          />
        </Box>
      ) : null}

      <Box
        bg="#fafafa"
        w="100%"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          borderRadius="5px"
          padding="1rem"
          border="1px"
          // borderColor=
          // "
          minW="350px"
        >
          <Text padding="5px" fontSize="3xl" align="center">
            DopamineMedia
          </Text>
          <Tabs isFitted>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
