import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import './App.css';
import { calculateScaleFactor } from './slices/markerSlice';
import Header from './components/Header';
import MarkerList from './components/MarkerList';
import Tooltip from './components/Tooltip';

function App() {
  const dispatch = useDispatch();

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
      <Header />
      <Tooltip />
      <MarkerList />
    </div>
  );
}

export default App;
