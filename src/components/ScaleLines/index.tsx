import React, { Fragment } from 'react';
import type { CSSProperties } from 'react';
import classNames from 'classnames';

import css from './styles.module.css';

function ScaleLines() {
  const rings = [10, 100, 1000, 10000];

  return (
    <div className={css.wrap}>
      {rings.map((distance) => (
        <Fragment key={distance}>
          <div
            className={css.circle}
            style={{ '--band-value': distance } as CSSProperties}
          >
            <span className={css.label}>{distance} km</span>
          </div>

          {distance !== rings[rings.length - 1] &&
            Array(9)
              .fill('')
              .map((_, i) => (
                <div
                  className={classNames(css.circle, css.subCircle)}
                  style={
                    { '--band-value': distance * (i + 1) } as CSSProperties
                  }
                  key={distance * i}
                ></div>
              ))}
        </Fragment>
      ))}
    </div>
  );
}

export default ScaleLines;
