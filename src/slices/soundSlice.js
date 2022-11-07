/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { sound } from '@pixi/sound';

const initialState = {
  isLoaded: false,
  stopped: true,
  mainVolume: 0.5,
  effectVolume: 0.2,
};

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    loadSounds: (state) => {
      state.isLoaded = true;
    },
    play: (state, action) => {
      if (sound.exists(action.payload.name, false)) {
        sound.play(action.payload.name, { volume: action.payload.volume });
        state.stopped = false;
      }
    },
    loop: (state, action) => {
      if (sound.exists(action.payload.name, false)) {
        sound.play(action.payload.name, { loop: true, volume: action.payload.volume });
        state.stopped = false;
      }
    },
    stop: (state, action) => {
      if (sound.exists(action.payload, false)) {
        sound.stop(action.payload);
      }
    },
    stopAll: (state) => {
      sound.stopAll();
      state.stopped = true;
    },
    pause: (state, action) => {
      if (sound.exists(action.payload, false)) {
        sound.pause(action.payload);
      }
    },
    resume: (state, action) => {
      if (sound.exists(action.payload, false)) {
        sound.resume(action.payload);
      }
    },
    setVolume: (state, action) => {
      if (sound.exists(action.payload.name, false)) {
        sound.volume(action.payload.name, action.payload.volume);
      }
    },
    updateMainVolume: (state, action) => {
      state.mainVolume = action.payload;
    },
    updateEffectVolume: (state, action) => {
      state.effectVolume = action.payload;
    },
  },
});

export const {
  loadSounds,
  play,
  loop,
  stop,
  stopAll,
  pause,
  resume,
  setVolume,
  updateMainVolume,
  updateEffectVolume,
} = soundSlice.actions;

export default soundSlice.reducer;
