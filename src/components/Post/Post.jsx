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
  useToast,
  IconButton,
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addComment,
  deleteComment,
  deletePost,
  upvoteComment,
  downvoteComment,
} from '../../feature/post/postSlice';
import { editPost } from '../../feature/post/postSlice';
import { addToLike, deleteFromLike } from '../../feature/post/postSlice';
import {
  addBookmark,
  deleteBookmark,
} from './../../feature/bookmark/bookmarkSlice';
import LikedBy from '../LikedBy/LikedBy';
import { getIcons } from '../../util/getIcons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { removeFromFollowers } from './../../feature/followers/followerSlice';
function Post({ username, likes, content, img, _id, comments }) {
  const postId = _id;
  const toast = useToast();
  const postState = useSelector(state => state.post);
  const bookmarkState = useSelector(state => state.bookmark);
  const { user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [editComment, setEditComment] = useState(true);
  const [post, setPost] = useState({
    content: content,
    img: img,
    comments: comments,
  });
  console.log(post);
  const commentRef = useRef(null);
  const [postAuthor, setAuthor] = useState({ _id: '' });
  useEffect(() => {
    async function getUsers() {
      const response = await axios({ method: 'GET', url: '/api/users' });
      const user = response.data.users.filter(
        user => user.username === username
      );
      setAuthor(user[0]);
    }
    async function getComments() {
      const response = await axios({
        method: 'GET',
        url: `/api/comments/${_id}`,
      });
      console.log(response);
    }
    getUsers();
    getComments();
  }, [user.token]);
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
            <Link to={`/${postAuthor?._id}`}>
              <Avatar
                size="sm"
                name={username}
                src="hdttps://bit.ly/kent-c-dodds"
              />
            </Link>

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
                {user.username === username ? null : (
                  <Text
                    cursor="pointer"
                    onClick={() => {
                      dispatch(
                        removeFromFollowers({
                          _id: postAuthor._id,
                          token,
                        })
                      );
                    }}
                  >
                    Unfollow
                  </Text>
                )}
                <Text cursor="pointer">Go To Post</Text>
                {user.username === username ? (
                  <Text
                    cursor="pointer"
                    onClick={() => {
                      console.log('clciked');
                      dispatch(deletePost({ _id, token }));
                      toast({
                        title: 'Your post has been deleted',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    Delete Post
                  </Text>
                ) : null}
                {user.username === username ? (
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
              dispatch(editPost({ _id, data: post, token }));
              toast({
                title: 'You updated your post',
                status: 'info',
                duration: 5000,
                isClosable: true,
              });
              setEditable(false);
            }}
          >
            Save
          </Button>
        ) : null}
        <Box d="flex" justifyContent="space-between">
          <Box d="flex">
            <Box>
              {likes.likedBy.some(users => users.username === user.username) ? (
                <Box
                  onClick={() => {
                    dispatch(deleteFromLike({ _id, token }));
                    toast({
                      title: 'You no longer like this post',
                      status: 'error',
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                >
                  {getIcons('LIKE_FILL', '27px')}
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    dispatch(addToLike({ _id, token }));
                    toast({
                      title: 'You liked this post',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                >
                  {getIcons('OUTLINE_HEART', '27px')}
                </Box>
              )}
            </Box>
            {getIcons('COMMENT', '27px')}
          </Box>
          <Box>
            {bookmarkState.bookmark.includes(_id) ? (
              <Box
                onClick={() => {
                  dispatch(deleteBookmark({ _id, token }));
                  toast({
                    title: 'This post has been removed from bookmarks',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                {getIcons('BOOKMARK_FILL', '27px')}
              </Box>
            ) : (
              <Box
                onClick={() => {
                  dispatch(addBookmark({ _id, token }));
                  toast({
                    title: 'Moved post to bookmark',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
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
        <Text>
          {comments.map(({ comment, username, _id }) => {
            return (
              <Box d="flex" gap="1">
                <Text fontWeight="700">{username}</Text>
                <Input
                  isReadOnly={true}
                  border="none"
                  h="24px"
                  value={comment}
                  onChange={e =>
                    setPost(prev => ({ ...prev, comment: e.target.value }))
                  }
                />
                <IconButton
                  bg="none"
                  h="min-content"
                  icon={getIcons('DELETE_POST', '16px')}
                  onClick={() => {
                    dispatch(deleteComment({ postId, commentId: _id, token }));
                  }}
                />
                <IconButton
                  bg="none"
                  h="min-content"
                  aria-label="Search database"
                  icon={getIcons('UPVOTE', '16px')}
                  onClick={() => {
                    dispatch(upvoteComment({ postId, commentId: _id, token }));
                  }}
                />
                <IconButton
                  bg="none"
                  h="min-content"
                  aria-label="Search database"
                  icon={getIcons('DOWNVOTE', '16px')}
                  onClick={() => {
                    dispatch(
                      downvoteComment({ postId, commentId: _id, token })
                    );
                  }}
                />
              </Box>
            );
          })}
        </Text>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Add a comment..."
            value={post.comments}
            onChange={e =>
              setPost(prev => ({ ...prev, comments: e.target.value }))
            }
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                dispatch(
                  addComment({
                    _id,
                    comment: { comment: post.comments },
                    token,
                  })
                );
                setPost(prev => ({ ...prev, comments: '' }));
              }}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
}

export default Post;
