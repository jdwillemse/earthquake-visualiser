import { createSlice } from '@reduxjs/toolkit';

export const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    scaleFactor: 1,
    ringInterval: 55,
  },
  reducers: {
    calculateScaleFactor: (state, action) => {
      // I did not get round to making this responsive as it should be
      state.scaleFactor = 3;
      state.ringInterval = 100;
    },
  },
});

export const { calculateScaleFactor } = markerSlice.actions;

export const selectScaleFactor = (state) => state.marker.scaleFactor;
export const selectRingInterval = (state) => state.marker.ringInterval;

export default markerSlice.reducer;
