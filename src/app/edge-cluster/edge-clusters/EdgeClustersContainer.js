import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userEdgeClusters } from './PropTypes';
import EdgeClustersView from './EdgeClustersView';

export class EdgeClustersContainer extends Component {
  createEdgeCluster = () => {
    const {
      history,
      match: { params: tenantID },
    } = this.props;

    history.push(`/${tenantID.tenantID}/create-edge-cluster`);
  };

  render = () => {
    const { user } = this.props;
    const edgeClusters = user.edgeClusters.edges.map(edge => edge.node);

    return <EdgeClustersView edgeClusters={edgeClusters} onCreateEdgeClusterClick={this.createEdgeCluster} />;
  };
}

EdgeClustersContainer.propTypes = {
  user: userEdgeClusters.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EdgeClustersContainer));
