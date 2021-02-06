import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Switch, Redirect } from 'react-router-dom';

import './App.css';
import NotificationHandlerContainer from './components/common/notification-handler';
import RouteWithLayout from './components/common/route-with-layout';
import LoadingContainer from './components/common/loading';
import NotFoundContainer from './components/common/not-found';
import PublicMainContainer from './layouts/public-main';
import MainContainer from './layouts/main';
import PublicHomeContainer from './components/app/public-home';
import DashboardContainer from './components/app/dashboard';
import Tenants from './components/app/tenant/tenant-management';
import SetTenant from './components/app/tenant/set-tenant';
import EdgeClusters from './components/app/edge-cluster/edge-cluster-management';
import SetEdgeCluster from './components/app/edge-cluster/set-edge-cluster';

import GenericErrorContainer from './components/common/generic-error';

const Routes = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <GenericErrorContainer message={error.message} />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <div className="container flex-grow-1">
        <Switch>
          {isAuthenticated ? (
            <RouteWithLayout isSecureRoute={true} exact path="/" layout={MainContainer} component={DashboardContainer} />
          ) : (
            <RouteWithLayout isSecureRoute={false} exact path="/" layout={PublicMainContainer} component={PublicHomeContainer} />
          )}
          <RouteWithLayout isSecureRoute={true} exact path="/dashboard" layout={MainContainer} component={DashboardContainer} />
          <RouteWithLayout isSecureRoute={true} exact path="/tenant" layout={MainContainer} component={Tenants} />
          <RouteWithLayout isSecureRoute={true} exact path="/tenant/create" component={SetTenant} layout={MainContainer} />
          <RouteWithLayout isSecureRoute={true} exact path="/tenant/:tenantId" component={SetTenant} layout={MainContainer} />
          <RouteWithLayout isSecureRoute={true} exact path="/edgecluster" layout={MainContainer} component={EdgeClusters} />
          <RouteWithLayout isSecureRoute={true} exact path="/edgecluster/create" component={SetEdgeCluster} layout={MainContainer} />
          <RouteWithLayout isSecureRoute={true} exact path="/edgecluster/:edgeClusterId" component={SetEdgeCluster} layout={MainContainer} />
          <RouteWithLayout
            isSecureRoute={false}
            exact
            path="/notfound"
            component={NotFoundContainer}
            layout={isAuthenticated ? MainContainer : PublicMainContainer}
          />
          <RouteWithLayout isSecureRoute={true} exact path="/dashboard" component={DashboardContainer} layout={MainContainer} />
          <Redirect to="/notfound" />
        </Switch>
        <NotificationHandlerContainer />
      </div>
    </div>
  );
};

export default Routes;
