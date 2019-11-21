import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateEdgeClusterView from './CreateEdgeClusterView';
import { RelayEnvironment } from '../../../framework/relay';
import { CreateEdgeCluster } from '../../../framework/relay/mutations';

export class CreateEdgeClusterContainer extends Component {
  createEdgeCluster = ({ name, clusterSecret }) => {
    const {
      history,
      environment,
      createEdgeCluster,
      match: { params: tenantID },
    } = this.props;

    createEdgeCluster(environment, {
      name,
      clusterSecret,
      tenantID: tenantID.tenantID,
      clusterType: 'K3S',
    });

    history.push(`/${tenantID.tenantID}/edge-clusters`);
  };

  cancel = values => {
    const {
      history,
      match: { params: tenantID },
    } = this.props;

    history.push(`/${tenantID.tenantID}/edge-clusters`);
  };

  render = () => {
    return <CreateEdgeClusterView onSubmit={this.createEdgeCluster} onCancelButtonClick={this.cancel} />;
  };
}

CreateEdgeClusterContainer.propTypes = {};

const mapStateToProps = () => ({
  environment: RelayEnvironment,
  createEdgeCluster: CreateEdgeCluster,
});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEdgeClusterContainer));
