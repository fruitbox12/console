import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userTenants } from './PropTypes';
import TenantsView from './TenantsView';

export class TenantsContainer extends Component {
  createTenant = () => {
    const { history } = this.props;

    history.push('/create-tenant');
  };

  render = () => {
    const { user } = this.props;
    const tenants = user.tenants.edges.map(edge => edge.node);

    return <TenantsView tenants={tenants} onCreateTenantClick={this.createTenant} />;
  };
}

TenantsContainer.propTypes = {
  user: userTenants.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TenantsContainer));
