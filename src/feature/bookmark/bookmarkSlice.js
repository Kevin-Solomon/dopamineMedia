import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addToBookmark } from '../../service';
const initialState = {
  bookmark: [],
  loading: false,
  error: false,
};

export const getInitialBookmark = createAsyncThunk(
  'bookmark/getBookmarks',
  async token => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/api/users/bookmark',
        headers: { authorization: token },
      });
      return response.data.bookmarks;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addBookmark = createAsyncThunk(
  'bookmark/addBookmark',
  async ({ _id, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/users/bookmark/${_id}`,
        headers: { authorization: token },
      });

      return response.data.bookmarks;
    } catch (err) {
      console.log(err.response);
    }
  }
);
export const deleteBookmark = createAsyncThunk(
  'bookmark/deleteBookmark',
  async ({ _id, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/users/remove-bookmark/${_id}`,
        headers: { authorization: token },
      });
      return response.data.bookmarks;
    } catch (err) {
      console.log(err);
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: {
    [getInitialBookmark.pending]: state => {
      state.loading = true;
    },
    [getInitialBookmark.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookmark = payload;
    },
    [getInitialBookmark.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [addBookmark.pending]: state => {
      state.loading = true;
    },
    [addBookmark.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookmark = payload;
    },
    [addBookmark.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [deleteBookmark.pending]: state => {
      state.loading = true;
    },
    [deleteBookmark.fulfilled]: (state, action) => {
      state.loading = false;
      state.bookmark = action.payload;
    },
    [deleteBookmark.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default bookmarkSlice.reducer;
