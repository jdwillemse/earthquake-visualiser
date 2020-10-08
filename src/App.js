import React, { useContext } from 'react';

import { EarthquakeDataContext } from './contexts/EarthquakeDataContext';
import Marker from './components/Marker';

import './App.css';

function App() {
  const { earthquakeData } = useContext(EarthquakeDataContext);
  const { features } = earthquakeData;

  if (!features) {
    return null;
  }

  const timeOffset = features[features.length - 1].properties.time;

  return (
    <div className="App">
      {features.map((item) => (
        <Marker {...item} timeOffset={timeOffset} key={item.id} />
      ))}
    </div>
  );
}

export default App;
