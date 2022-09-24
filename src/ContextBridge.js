/* eslint-disable react/jsx-filename-extension */
import React from 'react';

// eslint-disable-next-line react/prop-types
function ContextBridge({ render, Context, children }) {
  return (
    <Context.Consumer>
      {(value) => render(<Context.Provider value={value}>{children}</Context.Provider>)}
    </Context.Consumer>
  );
}

export default ContextBridge;
