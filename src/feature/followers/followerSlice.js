import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  followers: [],
  loading: false,
  error: true,
};
export const addFollowers = createAsyncThunk(
  'followers/addFollowers',
  async ({ _id, token }) => {
    try {
      const response = await axios({
        url: `/api/users/follow/${_id}`,
        method: 'POST',
        headers: { authorization: token },
      });
      console.log(response);
      return response.data.user.following.map(follow => follow.username);
    } catch (err) {
      console.log(err);
    }
  }
);
const followerSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers: {
    [addFollowers.pending]: state => {
      state.loading = true;
    },
    [addFollowers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.followers = payload;
    },
    [addFollowers.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default followerSlice.reducer;
