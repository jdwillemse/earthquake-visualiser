import React, { useEffect, useRef } from 'react';

import css from './styles.module.css';
import ScaleLines from '../ScaleLines';
import Marker from '../Marker';
import UserMarker from '../UserMarker';
import { useEarthquakeStore } from '../../slices/earthquakeDataSlice';
import { requestInterval, clearRequestInterval } from '../../utils/timers';

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
      clearRequestInterval(interval.current);
    }
    // keep polling the endpoint for data changes
    interval.current = requestInterval(() => {
      fetchEarthquakeData();
    }, FETCH_INTERVAL);

    return () => {
      clearRequestInterval(interval.current);
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
