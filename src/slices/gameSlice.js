/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gravity: 1,
  score: 0,
  hasStarted: false,
  height: 1080,
  width: 1920,
  obstacleSpeed: 1,
  birdJumpHeight: 3,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state) => {
      state.gravity = initialState.gravity;
      state.score = initialState.score;
      state.hasStarted = initialState.hasStarted;
      state.height = initialState.height;
      state.width = initialState.width;
      state.obstacleSpeed = initialState.obstacleSpeed;
      state.birdJumpHeight = initialState.birdJumpHeight;
    },
    incrementScore(state) {
      state.score += 1;
    },
    startGame(state) {
      state.hasStarted = true;
    },
    endGame(state) {
      state.hasStarted = false;
    },
  },
});

export const {
  reset, incrementScore, startGame, endGame,
} = gameSlice.actions;

export default gameSlice.reducer;
