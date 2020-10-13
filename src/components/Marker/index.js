import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import css from './styles.module.css';
import { selectScaleFactor } from '../../slices/markerSlice';
import {
  setActiveFeature,
  unsetActiveFeature,
} from '../../slices/tooltipSlice';
import Dot from '../Dot';

// [longitude,latitude]
function Marker({ geometry, properties, timeOffset }) {
  const scaleFactor = useSelector(selectScaleFactor);
  const dispatch = useDispatch();
  const animationDelay = (properties.time - timeOffset) / 10000;
  const customStyle = {
    left: geometry.coordinates[0] * scaleFactor,
    top: geometry.coordinates[1] * -scaleFactor,
    padding: `${properties.mag * scaleFactor}px`,
    animationDelay: `${animationDelay}ms`,
  };

  const handleMouseOver = useCallback(() => {
    dispatch(setActiveFeature({ geometry, properties }));
  }, [dispatch, geometry, properties]);

  const handleMouseOut = useCallback(() => {
    dispatch(unsetActiveFeature());
  }, [dispatch]);

  return (
    <div
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

Marker.defaultProps = {
  geometry: {},
  properties: {},
};

export default React.memo(Marker);
