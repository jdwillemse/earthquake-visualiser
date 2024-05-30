import React from 'react';
import cn from 'classnames';

import css from './styles.module.css';
import { tooltipId } from '../Tooltip';

function Dot({ userMarker }: { userMarker?: boolean }) {
  return (
    <button
      className={cn(css.marker, { [css.userMarker]: userMarker })}
      aria-controls={tooltipId}
    >
      <span className="sr-only">Hover or focus for more info</span>
    </button>
  );
}

export default Dot;
