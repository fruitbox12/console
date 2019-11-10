import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Tenants } from './app';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/tenants" />
      <Route component={Tenants} exact path="/tenants" />
    </Switch>
  );
};

export default Routes;
