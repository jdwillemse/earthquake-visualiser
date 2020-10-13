import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import './App.css';
import { requestInterval, clearRequestInterval } from './utils/timers';
import { fetchData } from './slices/earthquakeDataSlice';
import { calculateScaleFactor } from './slices/markerSlice';
import MarkerList from './components/MarkerList';
import Tooltip from './components/Tooltip';

// corresponds to the endpoint update rate
const FETCH_INTERVAL = 60000;

function App() {
  const dispatch = useDispatch();

  // fetch eatchquake data
  useEffect(() => {
    dispatch(fetchData());
    // keep polling the endpoint for data changes
    const interval = requestInterval(() => {
      dispatch(fetchData());
    }, FETCH_INTERVAL);
    return () => {
      clearRequestInterval(interval);
    };
  }, [dispatch]);

  // calculate size of marker canvas and add listeners to repeat calc after resize
  useEffect(() => {
    // high debounce interval prevents a lot of elements rerendering too often during resize
    const debouncedCalculate = debounce(() => {
      dispatch(calculateScaleFactor());
    }, 300);
    // calculate scale factor when component mounts initially
    dispatch(calculateScaleFactor());
    // update scale factor when browser resizes
    window.addEventListener('resize', debouncedCalculate);
    // clear DOM listeners when component is unmounted
    return () => {
      window.removeEventListener('resize', debouncedCalculate);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <header>
        <h1>Earthquakes of the last 24 hours</h1>
        <div>
          Hover markers to find out how far they are from your current location
        </div>
      </header>
      <Tooltip />
      <MarkerList />
    </div>
  );
}

export default App;
