import React, { useCallback } from 'react';

import css from './styles.module.css';
import { useTooltipStore } from '../../slices/tooltipSlice';
import Dot from '../Dot';
import { Earthquake } from '../../types/types';

function Marker({
  distance,
  bearing,
  properties,
  timeOffset,
}: Earthquake & { timeOffset: number }) {
  const { setSelectedMarker, clearSelectedMarker } = useTooltipStore(
    (state) => ({
      setSelectedMarker: state.setSelectedMarker,
      clearSelectedMarker: state.clearSelectedMarker,
    }),
  );
  // fade marker in based on earthquake time
  const animationDelay = (properties.time - timeOffset) / 10000;
  const customStyle = {
    '--magnitude': properties.mag,
    '--distance': distance,
    '--animation-delay': `${animationDelay}ms`,
  };

  const handleMouseOver = useCallback(() => {
    setSelectedMarker({ distance, properties });
  }, [setSelectedMarker, distance, properties]);

  const handleMouseOut = useCallback(() => {
    clearSelectedMarker();
  }, [clearSelectedMarker]);

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
