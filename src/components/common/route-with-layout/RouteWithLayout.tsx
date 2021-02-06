import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import LoadingContainer from '../loading';

interface RouteWithLayoutProps extends RouteProps {
  layout: React.ComponentType<any>;
  component: React.ComponentType<any>;
  isSecureRoute: boolean;
}

const RouteWithLayout = React.memo<RouteWithLayoutProps>(({ layout: Layout, component: Component, isSecureRoute, ...rest }) => {
  return isSecureRoute ? (
    <Route
      {...rest}
      component={withAuthenticationRequired(
        (matchProps) => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ),
        {
          onRedirecting: () => <LoadingContainer />,
        },
      )}
    />
  ) : (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
});

export default RouteWithLayout;
