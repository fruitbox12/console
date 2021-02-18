import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Switch, Redirect } from 'react-router-dom';

import './App.css';
import GenericErrorContainer from './components/common/generic-error';
import NotificationHandlerContainer from './components/common/notification-handler';
import RouteWithLayout from './components/common/route-with-layout';
import LoadingContainer from './components/common/loading';
import NotFoundContainer from './components/common/not-found';
import PublicMainContainer from './layouts/public-main';
import MainContainer from './layouts/main';
import PublicHomeContainer from './components/app/public-home';
import DashboardContainer from './components/app/dashboard';
import ProjectManagement from './components/app/project/project-management';
import SetProject from './components/app/project/set-project';
import EdgeClusterManagement from './components/app/edge-cluster/edge-cluster-management';
import SetEdgeCluster from './components/app/edge-cluster/set-edge-cluster';

const Routes = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <GenericErrorContainer message={error.message} />;
  }

  return (
    <React.Fragment>
      <Switch>
        {isAuthenticated ? (
          <RouteWithLayout isSecureRoute={true} exact path="/" layout={MainContainer} component={DashboardContainer} />
        ) : (
          <RouteWithLayout isSecureRoute={false} exact path="/" layout={PublicMainContainer} component={PublicHomeContainer} />
        )}
        <RouteWithLayout isSecureRoute={true} exact path="/dashboard" layout={MainContainer} component={DashboardContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/project" layout={MainContainer} component={ProjectManagement} />
        <RouteWithLayout isSecureRoute={true} exact path="/project/create" component={SetProject} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/project/:projectId" component={SetProject} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/edgecluster" layout={MainContainer} component={EdgeClusterManagement} />
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
    </React.Fragment>
  );
};

export default Routes;
