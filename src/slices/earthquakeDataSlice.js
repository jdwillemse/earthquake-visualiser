import { createSlice } from '@reduxjs/toolkit';

import { getRhumbDistance, getRhumbBearing } from '../utils/math';

const ENDPOINT =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const filterEarthquakes = (item) => item.properties.type === 'earthquake';

export const earthquakeDataSlice = createSlice({
  name: 'earthquakeData',
  initialState: {
    rawData: [],
    data: null,
  },
  reducers: {
    updateData: (state, action) => {
      state.rawData = action.payload;
    },
    // Separate fetching and grooming of data. Both depend on async data so
    // this prevents one becoming a bottleneck for the other
    groomData: (state, action) => {
      if (state.rawData.length) {
        state.data = state.rawData.map(
          ({ id, geometry, properties: { time, place, mag } }) => ({
            id,
            // only pick the properties that are used in the app
            properties: { time, place, mag },
            distance: getRhumbDistance(action.payload, geometry.coordinates),
            bearing: getRhumbBearing(action.payload, geometry.coordinates),
          })
        );
      }
    },
  },
});

export const { updateData, groomData } = earthquakeDataSlice.actions;

// Fetch data from API endpoint
export const fetchData = () => (dispatch, getState) => {
  fetch(ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      const { userLocation } = getState();
      // not all features are earthquakes so remove the ones that arent
      const earthQuakeFeatures = data.features.filter(filterEarthquakes);

      dispatch(updateData(earthQuakeFeatures));
      // only groom data if coordinates for user have been found
      if (userLocation.coordinates) {
        dispatch(groomData(userLocation.coordinates));
      }
    })
    .catch((error) => {
      // in production I'd never use an alert like this
      alert('Fetching data failed. Please refresh the page to try again');
      console.log(error);
    });
};

export const selectData = (state) => state.earthquakeData.data;

export default earthquakeDataSlice.reducer;
