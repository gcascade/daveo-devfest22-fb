import { configureStore } from '@reduxjs/toolkit';

const reducer = (state, action) => {
  if (action.type === 'JUMP') {
    return { ...state, birdY: state.birdY + state.jumpHeight };
  }
  if (action.type === 'SCORE_UP') {
    return { ...state, score: state.score + 1 };
  }
  return state;
};

const initialState = {
  jumpHeight: 3,
  birdY: 0,
  score: 0,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
