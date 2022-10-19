/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const { REACT_APP_SAVE_SCORE, REACT_APP_SCORE_PATH } = process.env;

const initialState = {
  gravity: 15,
  score: 0,
  hasStarted: false,
  height: 0.981 * 1080,
  width: 0.99 * 1920,
  obstacleSpeed: 1,
  birdJumpVelocity: 60,
  birdWidth: 94,
  birdHeight: 120,
  obstacleWidth: 100,
  gameSpeed: 8,
  obstacleMinSpacing: 400,
  obstacleMaxSpacing: 480,
  obstacleGap: 300,
  obstacleImageHeight: 810,
  godMode: false,
  maxGameSpeed: 15,
  displayDebugMenu: false,
  paused: false,
  speedIncrease: 0.5,
  obstacleMinHeight: 200,
  isSeaWorld: false,
  balloonWidth: 94,
  balloonHeight: 120,
  nautilusWidth: 150,
  nautilusHeight: 37,
  changingLevel: false,
  changeLevelEnabled: true,
  scoreNeededForNextLevel: 100,
  animationEnabled: true,
  birdScale: 1,
  lives: 0,
  pointsPerCoin: 10,
  totalScore: 0,
  sound: true,
  gameOver: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state) => {
      state.score = initialState.score;
      state.hasStarted = initialState.hasStarted;
      state.gameSpeed = initialState.gameSpeed;
      state.displayDebugMenu = initialState.displayDebugMenu;
      state.paused = initialState.paused;
      state.isSeaWorld = initialState.isSeaWorld;
      state.lives = initialState.lives;
      state.totalScore = initialState.totalScore;
      state.gameOver = initialState.gameOver;
    },
    incrementScore(state) {
      state.score += 1;
      state.totalScore += 1;

      if (state.changeLevelEnabled && state.score === state.scoreNeededForNextLevel) {
        state.changingLevel = true;
        state.paused = true;
      }
    },
    incrementTotalScore(state, action) {
      state.totalScore += action.payload ?? 0;
    },
    decreaseTotalScore(state, action) {
      state.totalScore -= action.payload ?? 0;
    },
    startGame(state) {
      state.hasStarted = true;
      state.score = 0;
    },
    endGame(state) {
      state.hasStarted = false;
      state.gameOver = true;

      if (REACT_APP_SAVE_SCORE === 'true') {
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');
        scores.push(state.totalScore);
        localStorage.setItem('scores', JSON.stringify(scores));

        // save file to server
        if (REACT_APP_SCORE_PATH && REACT_APP_SCORE_PATH !== '') {
          fetch(REACT_APP_SCORE_PATH, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: state.totalScore }),
          });
        }
      }
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
      state.animationEnabled = action.payload.animationEnabled ?? state.animationEnabled;
      state.lives = action.payload.lives ?? state.lives;
      state.pointsPerCoin = action.payload.pointsPerCoin ?? state.pointsPerCoin;
      state.sound = action.payload.sound ?? state.sound;

      if (state.isSeaWorld) {
        state.birdWidth = state.nautilusWidth;
        state.birdHeight = state.nautilusHeight;
      } else {
        state.birdWidth = initialState.balloonWidth;
        state.birdHeight = initialState.balloonHeight;
      }

      state.birdScale = action.payload.birdScale ?? state.birdScale;
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
    getLife(state) {
      state.lives += 1;
    },
    loseLife(state) {
      state.lives -= 1;
    },
  },
});

export const {
  reset,
  incrementScore,
  incrementTotalScore,
  decreaseTotalScore,
  startGame,
  endGame,
  setGameSpeed,
  updateSettings,
  displayDebugMenu,
  hideDebugMenu,
  pauseGame,
  resumeGame,
  getLife,
  loseLife,
} = gameSlice.actions;

export default gameSlice.reducer;
