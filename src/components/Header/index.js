import React from 'react';

import css from './styles.module.css';

const sf = [-122.431297, 37.773972];
const ct = [18.4233, -33.918861];
const tky = [139.839478, 35.652832];

function Marker() {
  return (
    <header>
      <h1 className={css.title}>Earthquakes during the last 24 hours</h1>
      <div>
        Hover markers to find out how far they are from your current location.
        Change to <a href={`?lon=${sf[0]}&lat=${sf[1]}`}>San Francisco</a> or{' '}
        <a href={`?lon=${ct[0]}&lat=${ct[1]}`}>Cape Town</a> or{' '}
        <a href={`?lon=${tky[0]}&lat=${tky[1]}`}>Tokyo</a>
      </div>
    </header>
  );
}

export default Marker;
