import React, { useEffect, useRef } from 'react';

import css from './styles.module.css';
import ScaleLines from '../ScaleLines';
import Marker from '../Marker';
import UserMarker from '../UserMarker';
import { useEarthquakeStore } from '../../slices/earthquakeDataSlice';

// corresponds to the endpoint update rate
const FETCH_INTERVAL = 60000;

function MarkerList() {
  const { earthquakes, fetchEarthquakeData } = useEarthquakeStore((state) => ({
    earthquakes: state.earthquakes,
    fetchEarthquakeData: state.fetchEarthquakeData,
  }));
  const interval = useRef(null);

  // fetch earthquake data
  useEffect(() => {
    fetchEarthquakeData();
    // clear interval before reassigning variable
    if (interval.current) {
      clearInterval(interval.current);
    }
    // keep polling the endpoint for data changes
    interval.current = setInterval(() => {
      fetchEarthquakeData();
    }, FETCH_INTERVAL);

    return () => {
      clearInterval(interval.current);
    };
  }, [fetchEarthquakeData]);

  // get the time of the last event and use that to calculate relative time of event
  const timeOffset =
    earthquakes && earthquakes[earthquakes.length - 1]?.properties.time;

  return (
    <div className={css.wrap}>
      <ScaleLines />
      <div className={css.markersWrap}>
        <UserMarker />
        {earthquakes?.map((item) => (
          <Marker {...item} timeOffset={timeOffset} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default MarkerList;
