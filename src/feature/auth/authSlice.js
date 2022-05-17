import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  user: {},
  token: '',
  loading: false,
  error: true,
};
export const loginUser = createAsyncThunk(
  '/auth/login',
  async ({ username, password }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/auth/login',
        data: { username, password },
      });
      console.log(response);
      return {
        user: response.data.foundUser,
        token: response.data.encodedToken,
      };
    } catch (err) {
      console.log(err);
    }
  }
);
export const signUpUser = createAsyncThunk(
  'auth/signup',
  async ({ user: { name, username, password }, navigate, prevpath }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/auth/signup',
        data: { name, username, password },
      });
      return {
        user: response.data.createdUser,
        token: response.data.encodedToken,
      };
    } catch (err) {
      console.error(err);
    }
  }
);
export const editUserDetails = createAsyncThunk(
  'auth/editUser',
  async ({ userData, token }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/users/edit',
        headers: { authorization: token },
        data: { userData },
      });
      console.log(response);
      return response.data.user;
    } catch (err) {
      console.log(err.response);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: state => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [signUpUser.pending]: state => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [signUpUser.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
    [editUserDetails.pending]: state => {
      state.loading = true;
    },
    [editUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [editUserDetails.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
  },
});
export default authSlice.reducer;
