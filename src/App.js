import React, { useContext } from 'react';

import { EarthquakeDataContext } from './contexts/EarthquakeDataContext';

import './App.css';

function App() {
  const { earthquakeData } = useContext(EarthquakeDataContext);

  return (
    <div className="App">{JSON.stringify(earthquakeData || {}, null, 2)}</div>
  );
}

export default App;
