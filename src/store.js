import { configureStore } from '@reduxjs/toolkit';
import earthquakeDataSlice from './slices/earthquakeDataSlice';
import markerSlice from './slices/markerSlice';
import tooltipSlice from './slices/tooltipSlice';
import userLocationSlice from './slices/userLocationSlice';

export default configureStore({
  reducer: {
    earthquakeData: earthquakeDataSlice,
    marker: markerSlice,
    tooltip: tooltipSlice,
    userLocation: userLocationSlice,
  },
});
