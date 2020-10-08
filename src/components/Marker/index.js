import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import css from './styles.module.css';

function Marker({ geometry, properties, reference, timeOffset }) {
  const animationDelay = (properties.time - timeOffset) / 10000;
  const handleHover = () => {
    console.log(geometry.coordinates, properties.place);
  };

  // console.log((properties.time - timeOffset) / 10000);
  return (
    <div className={css.wrap} onMouseOver={handleHover}>
      <div
        className={cn(css.marker, { [css.user]: reference })}
        style={{
          left: geometry.coordinates[0] * 2,
          top: geometry.coordinates[1] * -3,
          padding: `${properties.mag * 2}px`,
          animationDelay: `${animationDelay}ms`,
        }}
      >
        {/* <span className={css.label}>{Math.round(geometry.coordinates[1])}</span> */}
      </div>
    </div>
  );
}

Marker.defaultProps = {
  geometry: {},
  properties: {},
};

export default Marker;
