import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncRenderer } from '@goosewobbler/electron-redux';
import { App } from './App';
import { createReduxStore, Store } from '../common/reduxStore';

function render(reduxStore: Store): void {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
}

const reduxStore = createReduxStore({
  context: 'renderer',
  syncFn: syncRenderer,
});

render(reduxStore);
