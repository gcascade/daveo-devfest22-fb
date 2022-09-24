/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gravity: 1,
  score: 0,
  gameHasStarted: false,
  height: 1080,
  width: 1920,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state) => {
      state.gravity = initialState.gravity;
      state.score = initialState.score;
    },
    incrementScore(state) {
      state.score += 1;
    },
    startGame(state) {
      state.gameHasStarted = true;
    },
    endGame(state) {
      state.gameHasStarted = false;
    },
  },
});

export const {
  reset, incrementScore, startGame, endGame,
} = gameSlice.actions;

export default gameSlice.reducer;
