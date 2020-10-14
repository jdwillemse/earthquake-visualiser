import React from 'react';
import cn from 'classnames';

import css from './styles.module.css';

function ScaleLines() {
  const rings = [100, 1000, 10000];

  return (
    <div className={css.wrap}>
      {rings.map((distance, i) => (
        <div className={cn(css.circle)} key={distance}>
          <span className={css.label}>{distance} km</span>
        </div>
      ))}
    </div>
  );
}

export default ScaleLines;
