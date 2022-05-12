import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  post: [],
  loading: false,
  error: false,
};
export const getAllPost = createAsyncThunk('post/getAllPost', async () => {
  const response = await axios({ method: 'GET', url: '/api/posts' });
  console.log(response);
  return response.data.posts;
});
export const addPostFunction = createAsyncThunk(
  'post/addPost',
  async ({ post, token }) => {
    console.log(token);
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/posts',
        headers: { authorization: token },
        data: { postData: post },
      });

      return response.data.posts;
    } catch (err) {
      return err;
    }
  }
);
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ _id, token }) => {
    try {
      console.log(_id);
      const response = await axios({
        method: 'DELETE',
        url: `/api/posts/${_id}`,
        headers: { authorization: token },
      });
      console.log(response);
      return response.data.posts;
    } catch (err) {
      return err;
    }
  }
);
export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ _id, data, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/posts/edit/${_id}`,
        headers: { authorization: token },
        data: { postData: data },
      });
      console.log(response);
      return response.data.posts;
    } catch (err) {
      return err;
    }
  }
);
export const addComment = createAsyncThunk(
  'post/addComment',
  async ({ _id, token, comment }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/comments/add/${_id}`,
        headers: { authorization: token },
        data: { commentData: comment },
      });
      console.log(response);
      return response.data.posts;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async ({ postId, commentId, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/comments/delete/${postId}/${commentId}`,
        headers: { authorization: token },
      });
      return response.data.posts;
    } catch (err) {
      console.log(err);
    }
  }
);
export const upvoteComment = createAsyncThunk(
  'post/upvoteComment',
  async ({ postId, commentId, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/comments/upvote/${postId}/${commentId}`,
        headers: { authorization: token },
      });
      return response.data.posts;
    } catch (err) {
      console.log(err.response);
    }
  }
);
export const downvoteComment = createAsyncThunk(
  'post/downvoteComment',
  async ({ postId, commentId, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/comments/downvote/${postId}/${commentId}`,
        headers: { authorization: token },
      });
      return response.data.posts;
    } catch (err) {
      console.log(err.response);
    }
  }
);
export const addToLike = createAsyncThunk(
  'post/addLike',
  async ({ _id, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/posts/like/${_id}`,
        headers: { authorization: token },
      });
      return response.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);
export const deleteFromLike = createAsyncThunk(
  'post/deleteFromLike',
  async ({ _id, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/posts/dislike/${_id}`,
        headers: { authorization: token },
      });
      return response.data.posts;
    } catch (err) {
      console.error(err);
    }
  }
);
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPost.pending]: state => {
      state.loading = true;
    },
    [getAllPost.fulfilled]: (state, { payload }) => {
      state.post = [...payload];
      state.loading = false;
    },
    [getAllPost.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [addPostFunction.pending]: state => {
      state.loading = true;
    },
    [addPostFunction.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.post = payload;
    },
    [addPostFunction.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [deletePost.pending]: state => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
    },
    [deletePost.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [editPost.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [editPost.pending]: state => {
      state.loading = true;
    },
    [editPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
    },
    [addToLike.pending]: state => {
      state.loading = true;
    },
    [addToLike.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [addToLike.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    [deleteFromLike.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    [deleteFromLike.pending]: state => {
      state.loading = true;
    },
    [deleteFromLike.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [addComment.pending]: state => {
      state.pending = true;
    },
    [addComment.rejected]: state => {
      state.pending = false;
      state.error = true;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.post = payload;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.post = payload;
    },
    [deleteComment.rejected]: state => {
      state.pending = false;
      state.error = true;
    },
    [deleteComment.pending]: state => {
      state.pending = true;
    },
    [upvoteComment.pending]: state => {
      state.pending = true;
    },
    [upvoteComment.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.post = payload;
    },
    [upvoteComment.rejected]: state => {
      state.pending = false;
      state.error = true;
    },
    [downvoteComment.rejected]: state => {
      state.pending = false;
      state.error = true;
    },
    [downvoteComment.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.post = payload;
    },
    [downvoteComment.pending]: state => {
      state.pending = true;
    },
  },
});

export default postSlice.reducer;
