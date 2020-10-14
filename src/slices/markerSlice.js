import { createSlice } from '@reduxjs/toolkit';

// has to match with css
const MAX_WIDTH = 800;
// The last ring is not visualised but it falls at 100000 km
const RING_COUNT = 4;

export const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    scaleFactor: 1,
    ringInterval: 55,
  },
  reducers: {
    calculateScaleFactor: (state, action) => {
      // devide by 2 at the end because we need the radius not diameter
      state.ringInterval =
        Math.min(window.innerWidth, MAX_WIDTH) / RING_COUNT / 2;
      // make marker size responsive
      state.scaleFactor = state.ringInterval / 30;
    },
  },
});

export const { calculateScaleFactor } = markerSlice.actions;

export const selectScaleFactor = (state) => state.marker.scaleFactor;
export const selectRingInterval = (state) => state.marker.ringInterval;

export default markerSlice.reducer;
