/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  x: 0,
  y: 0,
  isJumping: false,
  jumpVelocity: 0,
};

export const birdSlice = createSlice({
  name: 'bird',
  initialState,
  reducers: {
    move: (state, action) => {
      state.x += action.payload.x ?? 0;
      state.y += action.payload.y ?? 0;
    },
    setY(state, action) {
      state.y = action.payload;
    },
    jump(state) {
      state.isJumping = true;
    },
    stopJump(state) {
      state.isJumping = false;
    },
    setJumpVelocity(state, action) {
      state.jumpVelocity = action.payload;
    },
    resetBird(state) {
      state.x = initialState.x;
      state.y = initialState.y;
      state.isJumping = initialState.isJumping;
      state.jumpVelocity = initialState.jumpVelocity;
    },
  },
});

export const {
  move, setY, jump, stopJump, setJumpVelocity, resetBird,
} = birdSlice.actions;

export default birdSlice.reducer;
