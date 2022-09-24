/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  obstacles: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addObstacle: (state, action) => {
      const obstacle = {
        id: action.payload.id ?? 0,
        x: action.payload.x ?? 0,
        y: action.payload.y ?? 0,
        angle: action.payload.angle ?? 0,
      };
      state.obstacles = [...state.obstacles, obstacle];
    },
    removeObstacle: (state, action) => {
      state.obstacles = state.obstacles.filter((obstacle) => obstacle.id !== action.payload);
    },
    moveObstacle(state, action) {
      const obstacle = state.obstacles.find((ob) => ob.id === action.payload.id);
      if (obstacle) {
        obstacle.x += action.payload.x ?? 0;
        obstacle.y += action.payload.y ?? 0;
      }
    },
  },
});

export const {
  addObstacle, removeObstacle, moveObstacle,
} = gameSlice.actions;

export default gameSlice.reducer;
