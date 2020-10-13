import { createSlice } from '@reduxjs/toolkit';

import { getRhumbDistance, getRhumbBearing } from '../utils/math';

const ENDPOINT =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const filterEarthquakes = (item) => item.properties.type === 'earthquake';

export const earthquakeDataSlice = createSlice({
  name: 'earthquakeData',
  initialState: {
    data: {},
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateData } = earthquakeDataSlice.actions;

// Fetch data from API endpoint
export const fetchData = (userCoordinates) => (dispatch) => {
  fetch(ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      // not all features are earthquakes so remove the ones that arent

      const earthQuakeFeatures = data.features
        .filter(filterEarthquakes)
        .map((item) => {
          return {
            ...item,
            distance: getRhumbDistance(
              userCoordinates,
              item.geometry.coordinates
            ),
            bearing: getRhumbBearing(
              userCoordinates,
              item.geometry.coordinates
            ),
          };
        });

      dispatch(
        updateData({
          ...data,
          features: earthQuakeFeatures,
        })
      );
    })
    .catch((error) => {
      // in production I'd never use an alert like this
      alert('Fetching data failed. Please refresh the page to try again');
      console.log(error);
    });
};

export const selectData = (state) => state.earthquakeData.data;

export default earthquakeDataSlice.reducer;
