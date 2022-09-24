import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import ContextBridge from './ContextBridge';
import './index.css';
import Game from './newApp';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
