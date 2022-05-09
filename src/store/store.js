import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../feature/post/postSlice';
import authReducer from './../feature/auth/authSlice';
import bookmarkReducer from './../feature/bookmark/bookmarkSlice';
import followerReducer from '../feature/followers/followerSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    bookmark: bookmarkReducer,
    followers: followerReducer,
  },
});
console.log(store);
