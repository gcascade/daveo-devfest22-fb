/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  x: 0,
  y: 0,
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
  },
});

export const { move, setY } = birdSlice.actions;

export default birdSlice.reducer;
