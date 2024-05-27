import { configureStore } from '@reduxjs/toolkit';
import earthquakeDataSlice from './slices/earthquakeDataSlice';
import tooltipSlice from './slices/tooltipSlice';
import userLocationSlice from './slices/userLocationSlice';

export default configureStore({
  reducer: {
    earthquakeData: earthquakeDataSlice,
    tooltip: tooltipSlice,
    userLocation: userLocationSlice,
  },
});
