import React, { useCallback, useContext } from 'react';
import cn from 'classnames';

import css from './styles.module.css';
import { MarkerContext } from '../../contexts/MarkerContext';
import { TooltipContext } from '../../contexts/TooltipContext';
import { tooltipId } from '../Tooltip';

// [longitude,latitude]
function Marker({ id, geometry, properties, userMarker, timeOffset }) {
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
    setActiveFeature({ id, geometry, properties });
  }, [setActiveFeature, id, geometry, properties]);

  const handleMouseOut = useCallback(() => {
    // keep the tooltip visible after hover
    // this is a naive implementation and in production I'd use a presence lib

    setActiveFeature(null);

    return () => {};
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
