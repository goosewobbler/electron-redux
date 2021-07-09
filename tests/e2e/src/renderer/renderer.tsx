import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncRenderer } from '@goosewobbler/electron-redux/renderer';
import { App } from './App';
import { createReduxStore, Store } from '../common/reduxStore';
import './renderer.css';

function render(reduxStore: Store): void {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
}

const reduxStore = createReduxStore(syncRenderer);
render(reduxStore);
