import { configureStore } from '@reduxjs/toolkit';
import likeReducer from './../feature/like/likeSlice';
export const store = configureStore({
  reducer: { like: likeReducer },
});
console.log(store);
