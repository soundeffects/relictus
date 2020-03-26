import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { CommandLine, Log, Status } from './ui';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Log />
      <CommandLine />
      <Status />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
