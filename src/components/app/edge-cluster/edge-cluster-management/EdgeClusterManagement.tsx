import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import EdgeClusterManagementContainer from './EdgeClusterManagementContainer';

import { EdgeClusterManagementQuery } from './__generated__/EdgeClusterManagementQuery.graphql';

export default React.memo(() => {
  return (
    <QueryRenderer<EdgeClusterManagementQuery>
      environment={RelayEnvironment}
      query={graphql`
        query EdgeClusterManagementQuery {
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
