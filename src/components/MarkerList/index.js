import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import css from './styles.module.css';
import ScaleLines from '../ScaleLines';
import Marker from '../Marker';
import UserMarker from '../UserMarker';
import { selectData, fetchData } from '../../slices/earthquakeDataSlice';
import { requestInterval, clearRequestInterval } from '../../utils/timers';

// corresponds to the endpoint update rate
const FETCH_INTERVAL = 60000;

function MarkerList() {
  const features = useSelector(selectData);
  const interval = useRef(null);

  const dispatch = useDispatch();

  // fetch earthquake data
  useEffect(() => {
    dispatch(fetchData());
    // clear interval before reassigning variable
    if (interval.current) {
      clearRequestInterval(interval.current);
    }
    // keep polling the endpoint for data changes
    interval.current = requestInterval(() => {
      dispatch(fetchData());
    }, FETCH_INTERVAL);

    return () => {
      clearRequestInterval(interval.current);
    };
  }, [dispatch]);

  // get the time of the last event and use that to calculate relative time of event
  const timeOffset = features && features[features.length - 1]?.properties.time;

  return (
    <div className={css.wrap}>
      <ScaleLines />
      <div className={css.markersWrap}>
        <UserMarker />
        {features?.map((item) => (
          <Marker {...item} timeOffset={timeOffset} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default MarkerList;
