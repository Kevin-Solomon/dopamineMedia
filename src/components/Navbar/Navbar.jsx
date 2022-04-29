import React, { useState } from 'react';
import { addPost } from '../../service';
import { Box, Input, Text, Textarea } from '@chakra-ui/react';
import { getIcons } from '../../util/getIcons';
import {
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
} from '@chakra-ui/react';
import { useAuth, usePost } from '../../context';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authState } = useAuth();
  const { postDispatch } = usePost();
  const [post, setPost] = useState({ content: '', img: '' });
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
          <Box onClick={() => onOpen()}>{getIcons('ADD_OUTLINE', '27px')}</Box>
          <Box>{getIcons('EXPLORE_OUTLINE', '27px')}</Box>
          <Box>{getIcons('OUTLINE_HEART', '27px')}</Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="image">Email address</FormLabel>
            <Input
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
                console.log(reader);
              }}
              onDrop={e => {
                e.preventDefault();
                console.log('in drop');
                const reader = new FileReader();
                reader.readAsDataURL(e.dataTransfer.files[0]);
                reader.onload = e => {
                  e.preventDefault();
                  setPost(prevPost => ({ ...prevPost, img: reader.result }));
                };
                console.log(reader);
              }}
            />
            {post.img === '' ? null : (
              <AspectRatio maxW="400px" ratio={1 / 1}>
                <Image src={post.img} objectFit="contain" />
              </AspectRatio>
            )}
            <Textarea
              value={post.caption}
              onChange={e => {
                setPost(prevPost => ({ ...prevPost, content: e.target.value }));
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Exit Post
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                addPost(authState.token, post, postDispatch);
                setPost({ caption: '', img: '' });
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
