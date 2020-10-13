import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import css from './styles.module.css';
import {
  selectScaleFactor,
  selectRingInterval,
} from '../../slices/markerSlice';
import {
  setActiveFeature,
  unsetActiveFeature,
} from '../../slices/tooltipSlice';
import Dot from '../Dot';

// [longitude,latitude]
function Marker({ distance, bearing, properties, timeOffset }) {
  const scaleFactor = useSelector(selectScaleFactor);
  // distance in px between log circles
  const ringInterval = useSelector(selectRingInterval);
  const dispatch = useDispatch();
  // fade marker in based on earthquake time
  const animationDelay = (properties.time - timeOffset) / 10000;

  const ring = Math.floor(Math.log10(distance)); // the log band the marker belongs in
  const offset = Math.pow(10, ring); // distance before current log band
  const percentageOfRing =
    (distance - offset) / (Math.pow(10, ring + 1) - offset); // % where in log band the marker is meant to be places
  const position = percentageOfRing * ringInterval + ringInterval * (ring - 1); // add previous bands to position in current band

  const customStyle = {
    left: `${position}px`,
    padding: `${properties.mag * scaleFactor}px`,
    animationDelay: `${animationDelay}ms`,
  };

  const handleMouseOver = useCallback(() => {
    dispatch(setActiveFeature({ distance, properties }));
  }, [dispatch, distance, properties]);

  const handleMouseOut = useCallback(() => {
    dispatch(unsetActiveFeature());
  }, [dispatch]);

  return (
    <div
      style={{ transform: `rotate(${bearing - 90}deg)` }}
      className={css.wrap}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <Dot customStyle={customStyle} />
    </div>
  );
}

export default React.memo(Marker);
