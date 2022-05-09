import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../feature/post/postSlice';
import authReducer from './../feature/auth/authSlice';
import bookmarkReducer from './../feature/bookmark/bookmarkSlice';
export const store = configureStore({
  reducer: { post: postReducer, auth: authReducer, bookmark: bookmarkReducer },
});
console.log(store);
