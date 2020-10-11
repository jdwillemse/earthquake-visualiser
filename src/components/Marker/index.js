import React, { useCallback, useContext } from 'react';
import cn from 'classnames';

import css from './styles.module.css';
import { MarkerContext } from '../../contexts/MarkerContext';

function Marker({ id, geometry, properties, userMarker, timeOffset }) {
  const { scaleFactor } = useContext(MarkerContext);

  const animationDelay = (properties.time - timeOffset) / 10000;
  const customStyle = {
    left: geometry.coordinates[0] * scaleFactor,
    top: geometry.coordinates[1] * -scaleFactor,
    padding: `${properties.mag * scaleFactor}px`,
    animationDelay: `${animationDelay}ms`,
  };

  // console.log((properties.time - timeOffset) / 10000);
  return (
    <div
      className={css.wrap}
    >
      <button
        className={cn(css.marker, { [css.userMarker]: userMarker })}
        style={customStyle}
        aria-controls={tooltipId}
      >
        <span className="sr-only">Hover or focus for more info</span>
      </button>
    </div>
  );
}

Marker.defaultProps = {
  geometry: {},
  properties: {},
};

export default Marker;
