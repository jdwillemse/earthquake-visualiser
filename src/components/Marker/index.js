import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import css from './styles.module.css';
import {
  setActiveFeature,
  unsetActiveFeature,
} from '../../slices/tooltipSlice';
import Dot from '../Dot';

// [longitude,latitude]
function Marker({ distance, bearing, properties, timeOffset }) {
  const dispatch = useDispatch();
  // fade marker in based on earthquake time
  const animationDelay = (properties.time - timeOffset) / 10000;

  const customStyle = {
    '--magnitude': properties.mag,
    '--distance': distance,
    '--animation-delay': `${animationDelay}ms`,
  };

  const handleMouseOver = useCallback(() => {
    dispatch(setActiveFeature({ distance, properties }));
  }, [dispatch, distance, properties]);

  const handleMouseOut = useCallback(() => {
    dispatch(unsetActiveFeature());
  }, [dispatch]);

  return (
    <div
      style={{ transform: `rotate(${bearing - 90}deg)`, ...customStyle }}
      className={css.wrap}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <Dot />
    </div>
  );
}

export default React.memo(Marker);
