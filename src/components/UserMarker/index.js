import React, { useCallback, useEffect } from 'react';
import { useTooltipStore } from '../../slices/tooltipSlice';
import { useUserLocationStore } from '../../slices/userLocationSlice';

import css from './styles.module.css';
import Dot from '../Dot';

function UserMarker() {
  const { coordinates, getUserLocation } = useUserLocationStore((state) => ({
    coordinates: state.coordinates,
    getUserLocation: state.getUserLocation,
  }));
  const { setSelectedMarker, clearSelectedMarker } = useTooltipStore(
    (state) => ({
      setSelectedMarker: state.setSelectedMarker,
      clearSelectedMarker: state.clearSelectedMarker,
    }),
  );

  const customCopy = `Looks like your coordinates are ${coordinates}`;

  const handleMouseOver = useCallback(() => {
    setSelectedMarker({ customCopy });
  }, [customCopy, setSelectedMarker]);

  const handleMouseOut = useCallback(() => {
    clearSelectedMarker();
  }, [clearSelectedMarker]);

  // get user location to place marker
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <div
      className={css.wrap}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      {coordinates ? <Dot userMarker /> : <div className={css.loader}></div>}
    </div>
  );
}

export default UserMarker;
