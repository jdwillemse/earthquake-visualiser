import React, { useEffect, useState } from 'react';

const BerlinLat = 52.520008;
const BerlinLong = 13.404954;
// for the sake of this test use Berlin as default location
const initialState = {
  coordinates: [BerlinLong, BerlinLat],
};

export const UserLocationContext = React.createContext(initialState);

export const UserLocationProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState(initialState.coordinates);

  const success = (position) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    setCoordinates([longitude, latitude]);
  };

  const error = () => {
    setCoordinates([BerlinLong, BerlinLat]);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      // TODO: notify user of this
      console.log('Geolocation is not supported by your browser');
      error();
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <UserLocationContext.Provider value={{ coordinates }}>
      {children}
    </UserLocationContext.Provider>
  );
};
