import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const initialState = {
  scaleFactor: 1,
};

export const MarkerContext = React.createContext(initialState);

export const MarkerProvider = ({ children }) => {
  const [scaleFactor, setScaleFactor] = useState(initialState.scaleFactor);
  const padding = 40;

  // high debounce interval prevents a lot of elements rerendering too often during resize
  const calculateScaleFactor = debounce(() => {
    const scaleX = window.innerWidth / (360 + padding);
    const scaleY = window.innerHeight / (180 + padding);
    setScaleFactor(Math.min(scaleX, scaleY));
  }, 300);

  useEffect(() => {
    // calculate scale factor when component mounts initially
    calculateScaleFactor();
    // update scale factor when browser resizes
    window.addEventListener('resize', calculateScaleFactor);
    // clear DOM listeners when component is unmounted
    return () => {
      window.removeEventListener('resize', calculateScaleFactor);
    };
  }, [calculateScaleFactor]);

  console.log({ scaleFactor });
  return (
    <MarkerContext.Provider value={{ scaleFactor }}>
      {children}
    </MarkerContext.Provider>
  );
};
