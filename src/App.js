import React, { useContext } from 'react';

import { EarthquakeDataContext } from './contexts/EarthquakeDataContext';
import MarkerList from './components/MarkerList';
import Tooltip from './components/Tooltip';

import './App.css';

function App() {
  const { earthquakeData } = useContext(EarthquakeDataContext);

  return (
    <div className="App">
      <h1>Earthquakes of the last 24 hours</h1>
      {/* TODO: add location here */}
      <div>
        Hover markers to find out how far they are from your current location
      </div>
      <Tooltip />
      <MarkerList {...earthquakeData} />
    </div>
  );
}

export default App;
