import React from 'react';

import './App.css';
import Header from './components/Header';
import MarkerList from './components/MarkerList';
import Tooltip from './components/Tooltip';

function App() {
  return (
    <div className="App">
      <Header />
      <Tooltip />
      <MarkerList />
    </div>
  );
}

export default App;
