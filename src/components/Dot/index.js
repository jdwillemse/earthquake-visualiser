import React from 'react';
import cn from 'classnames';

import css from './styles.module.css';
import { tooltipId } from '../Tooltip';

function Dot({ customStyle, userMarker }) {
  return (
    <button
      className={cn(css.marker, { [css.userMarker]: userMarker })}
      style={customStyle}
      aria-controls={tooltipId}
    >
      <span className="sr-only">Hover or focus for more info</span>
    </button>
  );
}

export default Dot;
