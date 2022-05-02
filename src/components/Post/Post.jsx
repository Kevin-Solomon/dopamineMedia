import {
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Textarea,
  Avatar,
  Button,
  Text,
  AspectRatio,
  Image,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverTrigger,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import LikedBy from '../LikedBy/LikedBy';
import { addToLike } from '../../service/addToLike';
import { useAuth, useBookmark, usePost } from '../../context';
import { getIcons } from '../../util/getIcons';
import { deletePost } from './../../service/deletePost';
import { updatePost } from './../../service';
import {
  removeFromLike,
  addToBookmark,
  removeFromBookmark,
} from './../../service';
function Post({ username, likes, content, img, _id }) {
  const { bookmarkState, bookmarkDispatch } = useBookmark();
  const [editable, setEditable] = useState(false);
  const [post, setPost] = useState({ content: content, img: img });
  const { authState } = useAuth();
  const { postDispatch } = usePost();
  return (
    <Box w="100%" margin="10px auto" backgroundColor="#ffffff">
      <Box
        d="flex"
        justifyContent="space-between"
        flexDirection="column"
        gap="10px"
        border="1px solid #dbdbdb"
        padding="10px"
      >
        <Box d="flex" justifyContent="space-between">
          <Box>
            <Avatar
              size="sm"
              name={username}
              src="hdttps://bit.ly/kent-c-dodds"
            />
            <Text>{username}</Text>
          </Box>
          <Popover>
            <PopoverTrigger>
              <Box>{getIcons('THREE_DOTS', '27px')}</Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Post Actions</PopoverHeader>
              <PopoverBody>
                <Text cursor="pointer">Follow/ Unfollow</Text>
                <Text cursor="pointer">Go To Post</Text>
                {authState.user.username === username ? (
                  <Text
                    cursor="pointer"
                    onClick={() => {
                      deletePost(authState.token, _id, postDispatch);
                    }}
                  >
                    Delete Post
                  </Text>
                ) : null}
                {authState.user.username === username ? (
                  <Text
                    cursor="pointer"
                    onClick={() => {
                      setEditable(true);
                    }}
                  >
                    Edit Post
                  </Text>
                ) : null}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        {img === undefined || img === '' ? null : (
          <Box>
            <AspectRatio maxW="400px" ratio={1} margin="0 auto">
              <Image src={img} alt="post" objectFit="cover" />
            </AspectRatio>
          </Box>
        )}
        {editable ? (
          <Textarea
            value={post.content}
            onChange={e =>
              setPost(prevPost => ({ ...prevPost, content: e.target.value }))
            }
          />
        ) : (
          <Text readOnly>{content}</Text>
        )}
        {editable ? (
          <Button
            onClick={() => {
              updatePost(_id, post, authState.token, postDispatch);
              setEditable(false);
            }}
          >
            Save
          </Button>
        ) : null}
        <Box d="flex" justifyContent="space-between">
          <Box d="flex">
            <Box>
              {likes.likedBy.some(
                user => user.username === authState.user.username
              ) ? (
                <Box
                  onClick={() => {
                    removeFromLike(_id, authState.token, postDispatch);
                  }}
                >
                  {getIcons('LIKE_FILL', '27px')}
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    addToLike(_id, authState.token, postDispatch);
                  }}
                >
                  {getIcons('OUTLINE_HEART', '27px')}
                </Box>
              )}
            </Box>
            {getIcons('COMMENT', '27px')}
          </Box>
          <Box>
            {bookmarkState.includes(_id) ? (
              <Box
                onClick={() => {
                  removeFromBookmark(_id, authState.token, bookmarkDispatch);
                }}
              >
                {getIcons('BOOKMARK_FILL', '27px')}
              </Box>
            ) : (
              <Box
                onClick={() => {
                  addToBookmark(_id, authState.token, bookmarkDispatch);
                }}
              >
                {' '}
                {getIcons('BOOKMARK', '27px')}
              </Box>
            )}
          </Box>
        </Box>
        <Text>
          {likes.likeCount === 0 ? (
            'Be the first one to like '
          ) : (
            <LikedBy users={likes.likedBy} />
          )}
        </Text>
        <Text></Text>
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
