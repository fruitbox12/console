import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import SetEdgeClusterContainer from './SetEdgeClusterContainer';

import { SetEdgeClusterQuery } from './__generated__/SetEdgeClusterQuery.graphql';

interface SetEdgeClusterProps
  extends RouteComponentProps<{
    edgeClusterId?: string;
  }> {}

const SetEdgeCluster = React.memo<SetEdgeClusterProps>(
  ({
    match: {
      params: { edgeClusterId },
    },
  }) => {
    return (
      <QueryRenderer<SetEdgeClusterQuery>
        environment={RelayEnvironment}
        query={graphql`
          query SetEdgeClusterQuery($edgeClusterId: ID!, $isUpdating: Boolean!) {
            user {
              ...SetEdgeClusterContainer_user
            }
          }
        `}
        variables={{
          edgeClusterId: edgeClusterId ? edgeClusterId : 'No ID',
          isUpdating: !!edgeClusterId,
        }}
        render={({ props, error }) => {
          if (props && props.user) {
            return <SetEdgeClusterContainer user={props.user} />;
          } else if (error) {
            return <GenericErrorContainer message={error.message} />;
          }

          return <LoadingContainer />;
        }}
      />
    );
  },
);

export default withRouter(SetEdgeCluster);
