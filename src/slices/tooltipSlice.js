import { createSlice } from '@reduxjs/toolkit';

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState: {
    activeFeature: null,
  },
  reducers: {
    setActiveFeature: (state, action) => {
      state.activeFeature = action.payload;
    },
    unsetActiveFeature: (state) => {
      state.activeFeature = null;
    },
  },
});

export const { setActiveFeature, unsetActiveFeature } = tooltipSlice.actions;

export const selectActiveFeature = (state) => state.tooltip.activeFeature;

export default tooltipSlice.reducer;
