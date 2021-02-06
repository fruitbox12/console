import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import EdgeClusterManagementContainer from './EdgeClusterManagementContainer';

import { EdgeClustersQuery } from './__generated__/EdgeClustersQuery.graphql';

export default React.memo(() => {
  return (
    <QueryRenderer<EdgeClustersQuery>
      environment={RelayEnvironment}
      query={graphql`
        query EdgeClustersQuery {
          user {
            ...EdgeClusterManagementContainer_user
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props && props.user) {
          return <EdgeClusterManagementContainer user={props.user} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
