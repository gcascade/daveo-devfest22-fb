import React from 'react';
import { Stage as PixiStage } from '@inlet/react-pixi';
import { ReactReduxContext } from 'react-redux';
import ContextBridge from './ContextBridge';

export default // eslint-disable-next-line react/prop-types
function Stage({ children, ...props }) {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      // eslint-disable-next-line react/jsx-props-no-spreading, no-shadow
      render={(children) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
}
