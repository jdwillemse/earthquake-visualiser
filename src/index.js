import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { EarthquakeDataProvider } from './contexts/EarthquakeDataContext';
import { MarkerProvider } from './contexts/MarkerContext';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <EarthquakeDataProvider>
      <MarkerProvider>
          <App />
      </MarkerProvider>
    </EarthquakeDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
