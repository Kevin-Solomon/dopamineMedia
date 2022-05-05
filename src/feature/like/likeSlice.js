import { createSlice } from '@reduxjs/toolkit';
W;
const initialState = {
  likes: [],
};
export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addToLike(state, action) {
      state.likes.push(action.payload);
    },
    removeFromLike(state, action) {},
  },
});
export const { addToLike } = likeSlice.actions;
export default likeSlice.reducer;
