import { create } from 'zustand';
import queryString from 'query-string';

interface UserLocationState {
  coordinates: null | [number, number];
  getUserLocation: () => Promise<void>;
  setUserLocation: (coords: string) => void;
  throwError: () => void;
}

// TS does not see number[] the same as [number, number] so this function converts the one to the other
const castTuple = (numbers: number[]): [number, number] => [
  numbers[0],
  numbers[1],
];

const berlin = castTuple([13.404954, 52.520008]);

export const useUserLocationStore = create<UserLocationState>()((set, get) => ({
  coordinates: null,
  getUserLocation: async () => {
    const parsedQuery = queryString.parse(window.location.search);

    // prioritize query string if it contains valid data
    if (parsedQuery.lat && parsedQuery.lon) {
      // TODO: add validation
      set({ coordinates: [Number(parsedQuery.lon), Number(parsedQuery.lat)] });
    } else if (!navigator.geolocation) {
      // in production this should alert the user of the problem
      console.log('Geolocation is not supported by your browser');
      get().throwError();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition): void => {
          set({
            coordinates: [position.coords.longitude, position.coords.latitude],
          });
        },
        get().throwError,
      );
    }
  },
  setUserLocation: (coords) => {
    const coordinates = castTuple(coords.split(',').map(Number));
    set({ coordinates });
  },
  throwError: () => {
    // for the sake of this test use Berlin as fallback location
    // in production we'd log the error and provide user feedback
    set({ coordinates: berlin });
  },
}));
