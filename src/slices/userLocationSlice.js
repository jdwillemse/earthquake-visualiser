import { createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";

const berlin = [13.404954, 52.520008];

export const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState: {
    coordinates: null,
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
  const parsedQuery = parse(window.location.search);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    dispatch(setCoordinates([longitude, latitude]));
  };

  const error = () => {
    // for the sake of this test use Berlin as fallback location
    dispatch(setCoordinates(berlin));
  };

  // prioritise query string if it contains valid data
  if (parsedQuery.lat && parsedQuery.lon) {
    dispatch(setCoordinates([parsedQuery.lon, parsedQuery.lat]));
  } else if (!navigator.geolocation) {
    // in production this should alert the user of the problem
    console.log('Geolocation is not supported by your browser');
    error();
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

export const selectCoordinates = (state) => state.userLocation.coordinates;

export default userLocationSlice.reducer;
