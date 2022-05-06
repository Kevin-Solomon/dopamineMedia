import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../feature/post/postSlice';
export const store = configureStore({
  reducer: { post: postReducer },
});
console.log(store);
