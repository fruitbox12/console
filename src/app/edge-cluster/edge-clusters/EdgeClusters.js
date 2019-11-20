import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../framework/relay';
import EdgeClustersRelayContainer from './EdgeClustersRelayContainer';

class EdgeClusters extends Component {
  renderRelayComponent = ({ props, error }) => {
    if (props && props.user) {
      return <EdgeClustersRelayContainer user={props.user} />;
    } else if (error) {
      return <div>{error.message}</div>;
    }

    return <div>Loading</div>;
  };

  render = () => {
    const {
      match: { params: tenantID },
    } = this.props;

    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query EdgeClustersQuery($tenantIDs: [ID!]) {
            user {
              ...EdgeClustersRelayContainer_user
            }
          }
        `}
        variables={{
          tenantIDs: [tenantID.tenantID],
        }}
        render={this.renderRelayComponent}
      />
    );
  };
}

export default withRouter(EdgeClusters);
