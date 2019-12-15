import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { oidcSecure } from '@axa-fr/react-oidc-redux';

import { RouteWithLayout } from './components';
import { MainContainer as MainLayout, MinimalContainer as MinimalLayout, PublicMinimalContainer as PublicMinimalLayout } from './layouts';
import { UserLoadingContainer, Tenants, CreateTenantContainer, EdgeClusters, CreateEdgeClusterContainer } from './app';
import { NotFound as NotFoundView, SignInContainer as SignInView, SignOutContainer as SignOutView } from './views';

const Routes = ({ isLoadingUser, userFound }) => {
  if (isLoadingUser) {
    return <UserLoadingContainer />;
  }

  return (
    <Switch>
      <Redirect exact from="/" to={userFound ? '/tenants' : '/sign-in'} />
      <RouteWithLayout component={oidcSecure(Tenants)} exact path="/tenants" layout={MainLayout} />
      <RouteWithLayout component={oidcSecure(CreateTenantContainer)} exact path="/create-tenant" layout={MainLayout} />
      <RouteWithLayout component={oidcSecure(EdgeClusters)} exact path="/:tenantID/edge-clusters" layout={MainLayout} />
      <RouteWithLayout component={oidcSecure(CreateEdgeClusterContainer)} exact path="/:tenantID/create-edge-cluster" layout={MainLayout} />
      <RouteWithLayout component={SignInView} exact layout={PublicMinimalLayout} path="/sign-in" />
      <RouteWithLayout component={SignOutView} exact layout={MinimalLayout} path="/sign-out" />
      <RouteWithLayout component={NotFoundView} exact layout={MinimalLayout} path="/not-found" />
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
