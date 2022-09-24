import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import ContextBridge from './components/ContextBridge';
import './index.css';
import Game from './components/Game';
import store from './store';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <ContextBridge
      Context={ReactReduxContext}
      render={(children) => (
        <Game>{children}</Game>
      )}
    />
  </Provider>,
  document.getElementById('root'),
);
