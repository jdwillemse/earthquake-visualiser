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
import { groomData } from '../../slices/earthquakeDataSlice';

function UserMarker() {
  const coordinates = useSelector(selectCoordinates);
  const scaleFactor = useSelector(selectScaleFactor);
  const dispatch = useDispatch();
  const customCopy = `Looks like your coordinates are ${coordinates}`;

  const handleMouseOver = useCallback(() => {
    dispatch(setActiveFeature({ customCopy }));
  }, [dispatch, customCopy]);

  const handleMouseOut = useCallback(() => {
    dispatch(unsetActiveFeature());
  }, [dispatch]);

  // get user location to place marker
  useEffect(() => {
    dispatch(getUserLocation());
  }, [dispatch]);

  // when coordinates update groom the data again without fetching it anew
  useEffect(() => {
    dispatch(groomData(coordinates));
  }, [dispatch, coordinates]);

  if (!coordinates) {
    return null;
  }
  const customStyle = {
    padding: `${Math.round(scaleFactor * 2)}px`,
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
