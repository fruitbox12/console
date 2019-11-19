import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Tenants, CreateTenantContainer } from './app';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/tenants" />
      <Route component={Tenants} exact path="/tenants" />
      <Route component={CreateTenantContainer} exact path="/create-tenant" />
    </Switch>
  );
};

export default Routes;
