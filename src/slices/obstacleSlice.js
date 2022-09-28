/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { v4 as randomUuid } from 'uuid';

const initialState = {
  obstacles: [],
};

export const obstacleSlice = createSlice({
  name: 'obstacle',
  initialState,
  reducers: {
    addObstacle: (state, action) => {
      const obstacle = {
        id: action.payload.id ?? randomUuid(),
        x: action.payload.x ?? 0,
        y: action.payload.y ?? 0,
        isTop: action.payload.isTop ?? false,
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
      state.obstacles = [...state.obstacles.filter(
        (obs) => obs.id !== action.payload,
        obstacle,
      )];
    },
    removeAllObstacles: (state) => {
      state.obstacles = [];
    },
  },
});

export const {
  addObstacle, removeObstacle, moveObstacle, removeAllObstacles,
} = obstacleSlice.actions;

export default obstacleSlice.reducer;
