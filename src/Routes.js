import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { SignIn } from './app';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/sign-in" />
      <Route component={SignIn} exact path="/sign-in" />
    </Switch>
  );
};

export default Routes;
