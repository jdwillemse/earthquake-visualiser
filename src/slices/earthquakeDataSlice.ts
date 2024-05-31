import { create } from 'zustand';

import { getRhumbDistance, getRhumbBearing } from '../utils/math';
import { useUserLocationStore } from './userLocationSlice';
import { APIResponse, Earthquake, Feature } from '../types/types';

interface EarthquakeState {
  rawData: null | Feature[];
  earthquakes: null | Earthquake[];
  fetchEarthquakeData: () => void;
  callEndpoint: () => Promise<void>;
  groomData: () => void;
}

const ENDPOINT =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const filterEarthquakes = (item: Earthquake): Boolean =>
  item.properties.type === 'earthquake';

export const useEarthquakeStore = create<EarthquakeState>()((set, get) => ({
  rawData: null,
  earthquakes: null,
  fetchEarthquakeData: () => {
    // split fetching and grooming so the user location can be updated without refetching data
    get().callEndpoint().then(get().groomData);

    // when coordinates update groom the data again without fetching it anew
    useUserLocationStore.subscribe(get().groomData);
  },
  callEndpoint: async () => {
    // Fetch data from API endpoint
    const response = await fetch(ENDPOINT);
    const data: APIResponse = await response.json();
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
    if (Array.isArray(coordinates) && rawData) {
      const groomedData = rawData.map(
        ({ id, geometry, properties: { time, place, mag } }: Feature) =>
          ({
            id,
            // only pick the properties that are used in the app
            properties: { time, place, mag },
            distance: getRhumbDistance(coordinates, geometry.coordinates),
            bearing: getRhumbBearing(coordinates, geometry.coordinates),
          }) as Earthquake,
      );
      set({ earthquakes: groomedData });
    }
  },
}));
