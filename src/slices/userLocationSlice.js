import { createSlice } from '@reduxjs/toolkit';

const BerlinLat = 52.520008;
const BerlinLong = 13.404954;

export const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState: {
    coordinates: [0, 0],
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setCoordinates } = userLocationSlice.actions;

// Fetch data from API endpoint
export const getUserLocation = () => (dispatch) => {
  const success = (position) => {
    const { latitude, longitude } = position.coords;
    dispatch(setCoordinates([longitude, latitude]));
  };

  const error = () => {
    // for the sake of this test use Berlin as fallback location
    dispatch(setCoordinates([BerlinLong, BerlinLat]));
  };

  if (!navigator.geolocation) {
    // in production this should alert the user of the problem
    console.log('Geolocation is not supported by your browser');
    error();
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

export const selectCoordinates = (state) => state.userLocation.coordinates;

export default userLocationSlice.reducer;
