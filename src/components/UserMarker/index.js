import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectScaleFactor } from '../../slices/markerSlice';
import {
  setActiveFeature,
  unsetActiveFeature,
} from '../../slices/tooltipSlice';
import {
  getUserLocation,
  selectCoordinates,
} from '../../slices/userLocationSlice';

import css from './styles.module.css';
import Dot from '../Dot';

function UserMarker() {
  const coordinates = useSelector(selectCoordinates);
  const scaleFactor = useSelector(selectScaleFactor);
  const dispatch = useDispatch();
  const customCopy = `Looks like your coordinates are ${coordinates}`;

  const handleMouseOver = useCallback(() => {
    dispatch(setActiveFeature({ geometry: { coordinates }, customCopy }));
  }, [dispatch, coordinates, customCopy]);

  const handleMouseOut = useCallback(() => {
    dispatch(unsetActiveFeature());
  }, [dispatch]);

  // get user location to place marker
  useEffect(() => {
    dispatch(getUserLocation());
  }, [dispatch]);

  if (!coordinates) {
    return null;
  }
  const customStyle = {
    left: coordinates[0] * scaleFactor,
    top: coordinates[1] * -scaleFactor,
    padding: `${scaleFactor * 2}px`,
    animationDelay: 0,
  };

  return (
    <div
      className={css.wrap}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <Dot customStyle={customStyle} userMarker />
    </div>
  );
}

export default UserMarker;
