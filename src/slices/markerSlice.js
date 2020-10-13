import { createSlice } from '@reduxjs/toolkit';

export const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    scaleFactor: 1,
  },
  reducers: {
    calculateScaleFactor: (state, action) => {
      // fixed spacing around markers
      const padding = 40;
      const scaleX = window.innerWidth / (360 + padding);
      const scaleY = window.innerHeight / (180 + padding);

      state.scaleFactor = Math.min(scaleX, scaleY);
    },
  },
});

export const { calculateScaleFactor } = markerSlice.actions;

export const selectScaleFactor = (state) => state.marker.scaleFactor;

export default markerSlice.reducer;
