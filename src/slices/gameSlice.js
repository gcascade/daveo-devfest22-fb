/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gravity: 1,
  score: 0,
  hasStarted: false,
  height: 1080,
  width: 1920,
  obstacleSpeed: 1,
  birdJumpVelocity: 10,
  birdWidth: 94,
  birdHeight: 120,
  obstacleWidth: 155,
  obstacleHeight: 400,
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
      state.birdJumpVelocity = initialState.birdJumpVelocity;
      state.birdWidth = initialState.birdWidth;
      state.birdHeight = initialState.birdHeight;
      state.obstacleWidth = initialState.obstacleWidth;
      state.obstacleHeight = initialState.obstacleHeight;
    },
    incrementScore(state) {
      state.score += 1;
    },
    startGame(state) {
      state.hasStarted = true;
      state.score = 0;
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
