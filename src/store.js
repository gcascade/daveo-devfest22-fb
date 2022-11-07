import { configureStore } from '@reduxjs/toolkit';
import birdReducer from './slices/birdSlice';
import gameReducer from './slices/gameSlice';
import obstacleReducer from './slices/obstacleSlice';
import bonusReducer from './slices/bonusSlice';
import soundReducer from './slices/soundSlice';

const store = configureStore({
  reducer: {
    bird: birdReducer,
    game: gameReducer,
    obstacle: obstacleReducer,
    bonus: bonusReducer,
    sound: soundReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
