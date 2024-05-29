import { create } from 'zustand';
import queryString from 'query-string';

const berlin = [13.404954, 52.520008];

export const useUserLocationStore = create((set) => ({
  coordinates: null,
  getUserLocation: async () => {
    const parsedQuery = queryString.parse(window.location.search);

    const error = () => {
      // for the sake of this test use Berlin as fallback location
      set({ coordinates: berlin });
    };

    // prioritise query string if it contains valid data
    if (parsedQuery.lat && parsedQuery.lon) {
      // TODO: add validation
      set({ coordinates: [parsedQuery.lon, parsedQuery.lat] });
    } else if (!navigator.geolocation) {
      // in production this should alert the user of the problem
      console.log('Geolocation is not supported by your browser');
      error();
    } else {
      function success(position) {
        set({
          coordinates: [position.coords.longitude, position.coords.latitude],
        });
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }
  },
}));
