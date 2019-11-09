import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import theme from './theme';
import Routes from './Routes';
import './App.css';

const browserHistory = createBrowserHistory();

const App = () => (
  <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </ThemeProvider>
);

export default App;
