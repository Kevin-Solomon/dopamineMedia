import React, { useState } from 'react';
import { Avatar, Box, Input, Text, Textarea } from '@chakra-ui/react';
import { getIcons } from '../../util/getIcons';
import {
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  AspectRatio,
  Image,
  FormLabel,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPostFunction } from './../../feature/post/postSlice';
function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [post, setPost] = useState({ content: '', img: '' });
  const navigate = useNavigate();
  const toast = useToast();
  const {
    auth: { token, user },
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.post);

  return (
    <Box
      bg="#ffffff"
      w="100%"
      color="black"
      position="fixed"
      top="0px"
      right="0px"
      paddingTop="1rem"
      zIndex="5"
      border="1px solid #dbdbdb"
      padding="10px"
    >
      {loading && (
        <Box h="100vh" w="100vw" position="fixed" bg="#fff" opacity="0.5">
          <Spinner
            color="red.500"
            size="xl"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
          />
        </Box>
      )}
      <Box width="60%" margin="0 auto" d="flex" justifyContent="space-between">
        <Link to="/">
          <Text>dopamineMedia</Text>
        </Link>
        <Box d="flex" gap="1rem">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                color: isActive ? '#3182CE' : '',
              };
            }}
          >
            <Box>{getIcons('OUTLINE_HOME', '27px')}</Box>
          </NavLink>

          <Box onClick={() => onOpen()}>{getIcons('ADD_OUTLINE', '27px')}</Box>
          <Box>{getIcons('EXPLORE_OUTLINE', '27px')}</Box>
          <Box>{getIcons('OUTLINE_HEART', '27px')}</Box>
          <Avatar
            cursor="pointer"
            onClick={() => {
              navigate(`/${user._id}`);
            }}
            size="sm"
            name={user?.name || user?.firstName}
          />
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setPost({ content: '', img: '' });
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="image">Click here</FormLabel>
            <Input
              display="none"
              id="image"
              type="file"
              onChange={e => {
                e.preventDefault();
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = e => {
                  e.preventDefault();
                  setPost(prevPost => ({ ...prevPost, img: reader.result }));
                };
              }}
            />
            <div
              style={{ height: '100px', backgroundColor: '#fafafa' }}
              onDragOver={e => {
                e.preventDefault();
                return false;
              }}
              onDrop={e => {
                e.preventDefault();
                const reader = new FileReader();

                reader.readAsDataURL(e.dataTransfer.files[0]);
                reader.onload = e => {
                  e.preventDefault();
                  setPost(prevPost => ({ ...prevPost, img: reader.result }));
                };
              }}
            >
              <Center
                w="100%"
                h="100%"
                border="3px dashed"
                borderColor="gray.200"
              >
                Drag And Drop Here
              </Center>
            </div>

            {post.img === '' ? null : (
              <AspectRatio maxW="400px" ratio={1 / 1}>
                <Image src={post.img} objectFit="contain" />
              </AspectRatio>
            )}
            <Textarea
              marginTop="20px"
              value={post.content}
              onChange={e => {
                setPost(prevPost => ({ ...prevPost, content: e.target.value }));
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={async () => {
                dispatch(addPostFunction({ post, token }));
                toast({
                  title: 'Get ready for the dopamine rush',
                  description: `You just posted something`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
                setPost({ content: '', img: '' });
                onClose();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Navbar;
