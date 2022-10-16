/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collectedBonuses: [],
  nextBonus: 5,
  currentBonus: {
    type: 'coin', x: -500, y: 500, scale: 0.5, active: false, goingUp: true, minY: 400, maxY: 600,
  },
};

export const bonusSlice = createSlice({
  name: 'bonus',
  initialState,
  reducers: {
    addBonus: (state, action) => {
      state.currentBonus = {
        type: action.payload.type,
        x: action.payload.x,
        y: action.payload.y,
        scale: action.payload.scale,
        active: true,
        goingUp: true,
        minY: action.payload.y - 100,
        maxY: action.payload.y + 100,
      };
    },
    collectBonus: (state, action) => {
      state.collectedBonuses.push(action.payload);
      state.currentBonus = initialState.currentBonus;
    },
    reset: (state) => {
      state.collectedBonuses = [];
      state.nextBonus = initialState.nextBonus;
      state.currentBonus = initialState.currentBonus;
    },
    rollNextBonus: (state) => {
      state.nextBonus = state.nextBonus + Math.floor(Math.random() * 10) + 10;
    },
    moveBonus: (state, action) => {
      state.currentBonus.x += action.payload.x ?? 0;
      state.currentBonus.y += action.payload.y ?? 0;
    },
    resetBonus: (state) => {
      state.currentBonus = initialState.currentBonus;
    },
    updateBonus: (state, action) => {
      state.currentBonus = {
        type: action.payload.type ?? state.currentBonus.type,
        x: action.payload.x ?? state.currentBonus.x,
        y: action.payload.y ?? state.currentBonus.y,
        scale: action.payload.scale ?? state.currentBonus.scale,
        goingUp: action.payload.goingUp ?? state.currentBonus.goingUp,
        minY: action.payload.minY ?? state.currentBonus.minY,
        maxY: action.payload.maxY ?? state.currentBonus.maxY,
        active: action.payload.active ?? state.currentBonus.active,
      };
    },
    removeOneHeartBonus: (state) => {
      const bonusIndex = state.collectedBonuses.findIndex((bonus) => bonus.type === 'heart');
      if (bonusIndex !== -1) {
        state.collectedBonuses.splice(bonusIndex, 1);
      }
    },
    removeOneCoinBonus: (state) => {
      const bonusIndex = state.collectedBonuses.findIndex((bonus) => bonus.type === 'coin');
      if (bonusIndex !== -1) {
        state.collectedBonuses.splice(bonusIndex, 1);
      }
    },
  },
});

export const {
  addBonus,
  reset,
  rollNextBonus,
  moveBonus,
  collectBonus,
  resetBonus,
  updateBonus,
  removeOneHeartBonus,
  removeOneCoinBonus,
} = bonusSlice.actions;

export default bonusSlice.reducer;
