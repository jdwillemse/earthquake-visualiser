import React, { useEffect, useState } from 'react';

const ENDPOINT =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const initialState = {
  error: null,
  earthquakeData: {},
};

export const EarthquakeDataContext = React.createContext(initialState);

export const EarthquakeDataProvider = ({ children }) => {
  const [earthquakeData, setEarthquakeData] = useState(
    initialState.earthquakeData
  );

  useEffect(() => {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEarthquakeData(data);
      })
      .catch((error) => {
        // TODO: handle errors
      });
  }, [setEarthquakeData]);

  return (
    <EarthquakeDataContext.Provider value={{ earthquakeData }}>
      {children}
    </EarthquakeDataContext.Provider>
  );
};
