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
export const addPost = createAsyncThunk(
  'post/addPost',
  async (postData, token) => {
    const response = await axios({
      method: 'POST',
      url: '/api/posts',
      headers: { authorization: token },
      data: { postData },
    });
    console.log(response);
    return response.data.posts;
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
    [addPost.pending]: state => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, payload) => {
      state.loading = false;
      state.post = [...payload];
    },
    [addPost.rejected]: (state, payload) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default postSlice.reducer;
