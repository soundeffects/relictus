import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, createTheme } from 'arwes';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme()}>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
