import React from 'react';

import css from './styles.module.css';

function Marker() {
  return (
    <header>
      <h1 className={css.title}>Earthquakes of the last 24 hours</h1>
      <div>
        Hover markers to find out how far they are from your current location
      </div>
    </header>
  );
}

export default Marker;
