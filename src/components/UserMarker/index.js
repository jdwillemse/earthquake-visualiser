import React, { useContext, useCallback } from 'react';

import css from './styles.module.css';
import Dot from '../Dot';
import { UserLocationContext } from '../../contexts/UserLocationContext';
import { MarkerContext } from '../../contexts/MarkerContext';
import { TooltipContext } from '../../contexts/TooltipContext';

function UserMarker() {
  const { coordinates } = useContext(UserLocationContext);
  const { scaleFactor } = useContext(MarkerContext);
  const { setActiveFeature } = useContext(TooltipContext);
  const customCopy = `Looks like your coordinates are ${coordinates}`;

  const handleMouseOver = useCallback(() => {
    setActiveFeature({ geometry: { coordinates }, customCopy });
  }, [setActiveFeature, coordinates, customCopy]);

  const handleMouseOut = useCallback(() => {
    setActiveFeature(null);
  }, [setActiveFeature]);

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
