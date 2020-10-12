import React, { useEffect, useState } from 'react';

import { requestInterval, clearRequestInterval } from '../utils/timers';

const FETCH_INTERVAL = 60000;
const ENDPOINT =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const initialState = {
  error: null,
  earthquakeData: {},
};

const filterEarthquakes = (item) => item.properties.type === 'earthquake';

export const EarthquakeDataContext = React.createContext(initialState);

export const EarthquakeDataProvider = ({ children }) => {
  const [earthquakeData, setEarthquakeData] = useState(
    initialState.earthquakeData
  );

  function fetchData() {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        // not all features are earthquakes so remove the ones that arent
        const earthQuakeFeatures = data.features.filter(filterEarthquakes);
        setEarthquakeData({
          ...data,
          features: earthQuakeFeatures,
        });
      })
      .catch((error) => {
        // in production I'd never use an alert like this
        alert('Fetching data failed. Please refresh the page to try again');
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
    const interval = requestInterval(() => {
      fetchData();
    }, FETCH_INTERVAL);
    return () => {
      clearRequestInterval(interval);
    };
  }, [setEarthquakeData]);

  return (
    <EarthquakeDataContext.Provider value={{ earthquakeData }}>
      {children}
    </EarthquakeDataContext.Provider>
  );
};
