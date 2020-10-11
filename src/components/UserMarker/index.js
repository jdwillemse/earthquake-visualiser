import React, { useEffect, useState } from 'react';

import Marker from '../Marker';
// import css from './styles.module.css';

const BerlinLat = 52.520008;
const BerlinLong = 13.404954;

function UserMarker() {
  const [coordinates, setCoordinates] = useState([0, 0]);

  function success(position) {
    console.log('success');
    const { latitude, longitude } = position.coords;
    setCoordinates([longitude, latitude]);

    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    console.log('Unable to retrieve your location');
    setCoordinates([BerlinLong, BerlinLat]);
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return <Marker geometry={{ coordinates }} userMarker />;
}

export default UserMarker;
