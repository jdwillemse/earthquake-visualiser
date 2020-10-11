import React, { useState } from 'react';

const initialState = {
  activeFeature: null,
};

export const TooltipContext = React.createContext(initialState);

export const TooltipProvider = ({ children }) => {
  const [activeFeature, setActiveFeature] = useState(
    initialState.activeFeature
  );

  return (
    <TooltipContext.Provider value={{ activeFeature, setActiveFeature }}>
      {children}
    </TooltipContext.Provider>
  );
};
