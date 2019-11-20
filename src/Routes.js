import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Tenants, CreateTenantContainer, EdgeClusters, CreateEdgeClusterContainer } from './app';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/tenants" />
      <Route component={Tenants} exact path="/tenants" />
      <Route component={CreateTenantContainer} exact path="/create-tenant" />
      <Route component={EdgeClusters} exact path="/:tenantID/edge-clusters" />
      <Route component={CreateEdgeClusterContainer} exact path="/:tenantID/create-edge-cluster" />
    </Switch>
  );
};

export default Routes;
