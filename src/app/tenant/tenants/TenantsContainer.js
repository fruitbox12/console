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

  handleTenantClick = id => {
    const { history } = this.props;
    const linkToEdgeClusters = `/${id}/edge-clusters`;

    history.push(linkToEdgeClusters);
  };

  render = () => {
    const { user } = this.props;
    const tenants = user.tenants.edges.map(edge => edge.node);

    return <TenantsView tenants={tenants} onCreateTenantClick={this.createTenant} onTenantClick={this.handleTenantClick} />;
  };
}

TenantsContainer.propTypes = {
  user: userTenants.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TenantsContainer));
