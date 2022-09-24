import { configureStore } from '@reduxjs/toolkit';
import birdReducer from './slices/birdSlice';
import gameReducer from './slices/gameSlice';

const store = configureStore({
  reducer: {
    bird: birdReducer,
    game: gameReducer,
  },
});

export default store;
