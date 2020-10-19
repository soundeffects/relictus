import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, createTheme } from 'arwes';

import Command from './components/Command';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Minimap from './components/Minimap';
import Status from './components/Status';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme()}>
      <div className="wrapper">
        <Log />
        <Command />
        <Minimap />
        <Status />
        <GameOver />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
