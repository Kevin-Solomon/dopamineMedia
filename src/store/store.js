import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../feature/post/postSlice';
import authReducer from './../feature/auth/authSlice';
export const store = configureStore({
  reducer: { post: postReducer, auth: authReducer },
});
console.log(store);
