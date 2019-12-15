import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { oidcSecure } from '@axa-fr/react-oidc-redux';

import { RouteWithLayout } from './components';
import { MainContainer, MinimalContainer, PublicMinimalContainer } from './layouts';
import { UserLoadingContainer, Tenants, CreateTenantContainer, EdgeClusters, CreateEdgeClusterContainer } from './app';
import { NotFound, SignInContainer, SignOutContainer } from './views';

const Routes = ({ isLoadingUser, userFound }) => {
  if (isLoadingUser) {
    return <UserLoadingContainer />;
  }

  return (
    <Switch>
      <Redirect exact from="/" to={userFound ? '/tenants' : '/sign-in'} />
      <RouteWithLayout component={oidcSecure(Tenants)} exact path="/tenants" layout={MainContainer} />
      <RouteWithLayout component={oidcSecure(CreateTenantContainer)} exact path="/create-tenant" layout={MainContainer} />
      <RouteWithLayout component={oidcSecure(EdgeClusters)} exact path="/:tenantID/edge-clusters" layout={MainContainer} />
      <RouteWithLayout component={oidcSecure(CreateEdgeClusterContainer)} exact path="/:tenantID/create-edge-cluster" layout={MainContainer} />
      <RouteWithLayout component={SignInContainer} exact layout={PublicMinimalContainer} path="/sign-in" />
      <RouteWithLayout component={SignOutContainer} exact layout={MinimalContainer} path="/sign-out" />
      <RouteWithLayout component={NotFound} exact layout={MinimalContainer} path="/not-found" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

const mapStateToProps = state => ({
  isLoadingUser: state.oidc.isLoadingUser,
  userFound: !!state.oidc.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
