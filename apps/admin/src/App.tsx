import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import i18n from './i18n';
import { getStore } from './framework/redux';
import theme from './theme';
import Routes from './Routes';
import Auth0ProviderWithHistory from './components/auth0';

let baseUrl = '/';
const base = document.getElementsByTagName('base');

if (base && base.length === 1) {
  baseUrl = base[0].getAttribute('href') as string;
}

const store = getStore();

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
          <Auth0ProviderWithHistory>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
