import { configureStore } from '@reduxjs/toolkit';
import birdReducer from './slices/birdSlice';
import gameReducer from './slices/gameSlice';
import obstacleReducer from './slices/obstacleSlice';

const store = configureStore({
  reducer: {
    bird: birdReducer,
    game: gameReducer,
    obstacle: obstacleReducer,
  },
});

export default store;
