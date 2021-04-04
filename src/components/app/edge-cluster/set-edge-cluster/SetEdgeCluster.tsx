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
    edgeClusterID?: string;
  }> {}

const SetEdgeCluster = React.memo<SetEdgeClusterProps>(
  ({
    match: {
      params: { edgeClusterID },
    },
  }) => {
    return (
      <QueryRenderer<SetEdgeClusterQuery>
        environment={RelayEnvironment}
        query={graphql`
          query SetEdgeClusterQuery($edgeClusterID: ID!, $isUpdating: Boolean!) {
            user {
              ...SetEdgeClusterContainer_user
            }
          }
        `}
        variables={{
          edgeClusterID: edgeClusterID ? edgeClusterID : 'No ID',
          isUpdating: !!edgeClusterID,
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
