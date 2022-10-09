/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gravity: 1,
  score: 0,
  hasStarted: false,
  height: 0.981 * 1080,
  width: 0.99 * 1920,
  obstacleSpeed: 1,
  birdJumpVelocity: 10,
  birdWidth: 94,
  birdHeight: 120,
  obstacleWidth: 100,
  gameSpeed: 1,
  obstacleMinSpacing: 400,
  obstacleMaxSpacing: 480,
  obstacleGap: 300,
  obstacleImageHeight: 810,
  godMode: false,
  maxGameSpeed: 5,
  displayDebugMenu: false,
  paused: false,
  speedIncrease: 0.2,
  obstacleMinHeight: 200,
  isSeaWorld: false,
  balloonWidth: 94,
  balloonHeight: 120,
  nautilusWidth: 150,
  nautilusHeight: 37,
  changingLevel: false,
  changeLevelEnabled: true,
  scoreNeededForNextLevel: 100,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state) => {
      // state.gravity = initialState.gravity;
      state.score = initialState.score;
      state.hasStarted = initialState.hasStarted;
      // state.height = initialState.height;
      // state.width = initialState.width;
      // state.obstacleSpeed = initialState.obstacleSpeed;
      // state.birdJumpVelocity = initialState.birdJumpVelocity;
      // state.birdWidth = initialState.birdWidth;
      // state.birdHeight = initialState.birdHeight;
      // state.obstacleWidth = initialState.obstacleWidth;
      state.gameSpeed = initialState.gameSpeed;
      // state.obstacleMinSpacing = initialState.obstacleMinSpacing;
      // state.obstacleMaxSpacing = initialState.obstacleMaxSpacing;
      // state.obstacleGap = initialState.obstacleGap;
      // state.obstacleImageHeight = initialState.obstacleImageHeight;
      // state.godMode = initialState.godMode;
      // state.maxGameSpeed = initialState.maxGameSpeed;
      state.displayDebugMenu = initialState.displayDebugMenu;
      state.paused = initialState.paused;
      // state.speedIncrease = initialState.speedIncrease;
      // state.obstacleMinHeight = initialState.obstacleMinHeight;
      state.isSeaWorld = initialState.isSeaWorld;
    },
    incrementScore(state) {
      state.score += 1;

      if (state.changeLevelEnabled && state.score === state.scoreNeededForNextLevel) {
        state.changingLevel = true;
        state.paused = true;
      }
    },
    startGame(state) {
      state.hasStarted = true;
      state.score = 0;
    },
    endGame(state) {
      state.hasStarted = false;
    },
    setGameSpeed(state, action) {
      state.gameSpeed = action.payload;
    },
    updateSettings(state, action) {
      state.gravity = action.payload.gravity ?? state.gravity;
      state.obstacleSpeed = action.payload.obstacleSpeed ?? state.obstacleSpeed;
      state.birdJumpVelocity = action.payload.birdJumpVelocity ?? state.birdJumpVelocity;
      state.obstacleMinSpacing = action.payload.obstacleMinSpacing ?? state.obstacleMinSpacing;
      state.obstacleMaxSpacing = action.payload.obstacleMaxSpacing ?? state.obstacleMaxSpacing;
      state.obstacleGap = action.payload.obstacleGap ?? state.obstacleGap;
      state.gameSpeed = action.payload.gameSpeed ?? state.gameSpeed;
      state.maxGameSpeed = action.payload.maxGameSpeed ?? state.maxGameSpeed;
      state.godMode = action.payload.godMode ?? state.godMode;
      state.speedIncrease = action.payload.speedIncrease ?? state.speedIncrease;
      state.obstacleMinHeight = action.payload.obstacleMinHeight ?? state.obstacleMinHeight;
      state.isSeaWorld = action.payload.isSeaWorld ?? state.isSeaWorld;
      state.changingLevel = action.payload.changingLevel ?? state.changingLevel;
      state.changeLevelEnabled = action.payload.changeLevelEnabled ?? state.changeLevelEnabled;
      state.scoreNeededForNextLevel = action.payload.scoreNeededForNextLevel
      ?? state.scoreNeededForNextLevel;

      if (state.isSeaWorld) {
        state.birdWidth = state.nautilusWidth;
        state.birdHeight = state.nautilusHeight;
      } else {
        state.birdWidth = initialState.balloonWidth;
        state.birdHeight = initialState.balloonHeight;
      }
    },
    displayDebugMenu(state) {
      state.displayDebugMenu = true;
    },
    hideDebugMenu(state) {
      state.displayDebugMenu = false;
    },
    pauseGame(state) {
      state.paused = true;
    },
    resumeGame(state) {
      state.paused = false;
    },
  },
});

export const {
  reset,
  incrementScore,
  startGame,
  endGame,
  setGameSpeed,
  updateSettings,
  displayDebugMenu,
  hideDebugMenu,
  pauseGame,
  resumeGame,
} = gameSlice.actions;

export default gameSlice.reducer;
