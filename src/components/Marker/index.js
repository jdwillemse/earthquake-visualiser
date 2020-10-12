import React, { useCallback, useContext } from 'react';

import css from './styles.module.css';
import { MarkerContext } from '../../contexts/MarkerContext';
import { TooltipContext } from '../../contexts/TooltipContext';
import Dot from '../Dot';

// [longitude,latitude]
function Marker({ geometry, properties, timeOffset }) {
  console.log('Marker');
  const { scaleFactor } = useContext(MarkerContext);
  const { setActiveFeature } = useContext(TooltipContext);
  const animationDelay = (properties.time - timeOffset) / 10000;
  const customStyle = {
    left: geometry.coordinates[0] * scaleFactor,
    top: geometry.coordinates[1] * -scaleFactor,
    padding: `${properties.mag * scaleFactor}px`,
    animationDelay: `${animationDelay}ms`,
  };

  const handleMouseOver = useCallback(() => {
    setActiveFeature({ geometry, properties });
  }, [setActiveFeature, geometry, properties]);

  const handleMouseOut = useCallback(() => {
    setActiveFeature(null);
  }, [setActiveFeature]);

  // console.log((properties.time - timeOffset) / 10000);
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
