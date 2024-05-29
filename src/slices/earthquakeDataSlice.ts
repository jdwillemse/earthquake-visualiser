import { create } from 'zustand';

import { getRhumbDistance, getRhumbBearing } from '../utils/math';
import { useUserLocationStore } from './userLocationSlice';

interface EarthquakeState {
  rawData: null | any;
  earthquakes: null | any;
  fetchEarthquakeData: () => void;
  callEndpoint: () => Promise;
  groomData: () => void;
}

const ENDPOINT =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const filterEarthquakes = (item) => item.properties.type === 'earthquake';

export const useEarthquakeStore = create<EarthquakeState>((set, get) => ({
  rawData: null,
  earthquakes: null,
  fetchEarthquakeData: () => {
    // split fetching and grooming so the user location can be updated without refetching data
    get().callEndpoint().then(get().groomData);

    // when coordinates update groom the data again without fetching it anew
    const unsubscribe = useUserLocationStore.subscribe(get().groomData);
    // TODO: figure out if this is correct
    return unsubscribe;
  },
  callEndpoint: async () => {
    // Fetch data from API endpoint
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    // not all features are earthquakes so remove the ones that are not
    const earthQuakeFeatures = data.features.filter(filterEarthquakes);

    set({ rawData: earthQuakeFeatures });
  },
  // Separate fetching and grooming of data. Both depend on async data so
  // this prevents one becoming a bottleneck for the other
  groomData: () => {
    const coordinates = useUserLocationStore.getState().coordinates;
    const rawData = get().rawData;

    // only groom data if coordinates for user have been found
    const groomedData =
      coordinates && rawData
        ? rawData.map(({ id, geometry, properties: { time, place, mag } }) => ({
            id,
            // only pick the properties that are used in the app
            properties: { time, place, mag },
            distance: getRhumbDistance(coordinates, geometry.coordinates),
            bearing: getRhumbBearing(coordinates, geometry.coordinates),
          }))
        : null;
    set({ earthquakes: groomedData });
  },
}));
