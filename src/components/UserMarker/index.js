import React, { useContext } from 'react';

// import css from './styles.module.css';
import Marker from '../Marker';
import { UserLocationContext } from '../../contexts/UserLocationContext';

function UserMarker() {
  const { coordinates } = useContext(UserLocationContext);

  return <Marker geometry={{ coordinates }} userMarker />;
}

export default UserMarker;
