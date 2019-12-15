import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Oidc } from '@axa-fr/react-oidc-redux';
import { AuthenticationProvider } from '@axa-fr/react-oidc-context';

import theme from './theme';
import { reduxStore } from './framework/redux';
import getOdicConfigurations from './framework/oidc';
import Routes from './Routes';
import './App.css';

const browserHistory = createBrowserHistory();

const App = () => {
  const odicConfigurations = getOdicConfigurations();

  return (
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Oidc store={reduxStore} configuration={odicConfigurations} isEnabled={true}>
            <AuthenticationProvider configuration={odicConfigurations}>
              <Routes />
            </AuthenticationProvider>
          </Oidc>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
