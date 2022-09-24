import { configureStore } from '@reduxjs/toolkit';

const reducer = (state, action) => {
  if (action.type === 'JUMP') {
    return { ...state, birdY: state.birdY + state.jumpHeight };
  }
  if (action.type === 'SCORE_UP') {
    return { ...state, score: state.score + 1 };
  }
  if (action.type === 'APPLY_GRAVITY') {
    return { ...state, birdY: state.birdY + state.gravity };
  }
  return state;
};

const initialState = {
  width: 1920,
  height: 1080,
  jumpHeight: 3,
  birdX: 1920 / 2,
  birdY: 1080 / 2,
  score: 0,
  gameHasStarted: false,
  gravity: 1,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
