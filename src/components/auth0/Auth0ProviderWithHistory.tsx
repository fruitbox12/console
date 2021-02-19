import React from 'react';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Auth0ProviderWithHistoryProps extends RouteComponentProps {
  children?: React.ReactNode;
}

const Auth0ProviderWithHistory = React.memo<Auth0ProviderWithHistoryProps>(({ children, history }) => {
  const domain = window._env_.AUTH0_DOMAIN;
  const clientId = window._env_.AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
});

export default withRouter(Auth0ProviderWithHistory);
