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

import ProjectCreate from './components/pages/project/ProjectCreate';
import ProjectList from './components/pages/project/ProjectList';
import ProjectDetails from './components/pages/project/ProjectDetails';

import EdgeClusterCreate from './components/pages/edge-cluster/EdgeClusterCreate';
import EdgeClusterList from './components/pages/edge-cluster/EdgeClusterList';
import EdgeClusterDetails from './components/pages/edge-cluster/EdgeClusterDetails';

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
          <RouteWithLayout isSecureRoute={true} exact path="/" component={DashboardContainer} layout={MainContainer} />
        ) : (
          <RouteWithLayout isSecureRoute={false} exact path="/" component={PublicHomeContainer} layout={PublicMainContainer} />
        )}
        <RouteWithLayout isSecureRoute={true} exact path="/dashboard" component={DashboardContainer} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/:projectID/dashboard" component={DashboardContainer} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/project" component={ProjectList} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/project/create" component={ProjectCreate} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/project/:projectID" component={ProjectDetails} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/:projectID" component={DashboardContainer} layout={MainContainer} />

        <RouteWithLayout isSecureRoute={true} exact path="/:projectID/edgecluster" component={EdgeClusterList} layout={MainContainer} />
        <RouteWithLayout isSecureRoute={true} exact path="/:projectID/edgecluster/create" component={EdgeClusterCreate} layout={MainContainer} />
        <RouteWithLayout
          isSecureRoute={true}
          exact
          path="/:projectID/edgecluster/:edgeClusterID"
          component={EdgeClusterDetails}
          layout={MainContainer}
        />
        <RouteWithLayout
          isSecureRoute={false}
          exact
          path="/notfound"
          component={NotFoundContainer}
          layout={isAuthenticated ? MainContainer : PublicMainContainer}
        />
        <Redirect to="/notfound" />
      </Switch>
      <NotificationHandlerContainer />
    </React.Fragment>
  );
};

export default Routes;
