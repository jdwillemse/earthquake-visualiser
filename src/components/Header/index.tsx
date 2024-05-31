import React, { useCallback } from 'react';
import type { MouseEvent } from 'react';

import css from './styles.module.css';
import { useUserLocationStore } from '../../slices/userLocationSlice';

const sf = [-122.431297, 37.773972];
const ct = [18.4233, -33.918861];
const tky = [139.839478, 35.652832];

function Marker() {
  const { setUserLocation } = useUserLocationStore((state) => ({
    setUserLocation: state.setUserLocation,
  }));
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setUserLocation(event.currentTarget.dataset.coords as string);
      if (window.history.pushState) {
        window.history.pushState({}, '', event.currentTarget.href);
      }
    },
    [setUserLocation],
  );

  return (
    <header className={css.header}>
      <h1 className={css.title}>Earthquakes during the last 24 hours</h1>
      <div className={css.intro}>
        Hover markers to find out how far they are from your current location.
        Change to{' '}
        <a
          href={`?lon=${sf[0]}&lat=${sf[1]}`}
          onClick={handleClick}
          data-coords={sf}
        >
          San Francisco
        </a>{' '}
        or{' '}
        <a
          href={`?lon=${ct[0]}&lat=${ct[1]}`}
          onClick={handleClick}
          data-coords={ct}
        >
          Cape Town
        </a>{' '}
        or{' '}
        <a
          href={`?lon=${tky[0]}&lat=${tky[1]}`}
          onClick={handleClick}
          data-coords={tky}
        >
          Tokyo
        </a>
      </div>
    </header>
  );
}

export default Marker;
