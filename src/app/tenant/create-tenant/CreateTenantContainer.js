import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateTenantView from './CreateTenantView';
import { RelayEnvironment } from '../../../framework/relay';
import { CreateTenant } from '../../../framework/relay/mutations';

export class CreateTenantContainer extends Component {
  createTenant = ({ name }) => {
    const { history, environment, createTenant } = this.props;

    createTenant(environment, { name });

    history.push('/tenants');
  };

  cancel = values => {
    const { history } = this.props;

    history.push('/tenants');
  };

  render = () => {
    return <CreateTenantView onSubmit={this.createTenant} onCancelButtonClick={this.cancel} />;
  };
}

CreateTenantContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createTenant: CreateTenant,
});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTenantContainer));
