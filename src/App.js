import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import theme from './theme';
import { reduxStore } from './framework/redux';
import Routes from './Routes';
import './App.css';

const browserHistory = createBrowserHistory();

const App = () => (
  <Provider store={reduxStore}>
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
