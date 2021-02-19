import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import EdgeClusterManagementContainer from './EdgeClusterManagementContainer';

import { EdgeClusterManagementQuery } from './__generated__/EdgeClusterManagementQuery.graphql';

interface EdgeClusterManagementProps
  extends RouteComponentProps<{
    projectId?: string;
  }> {}

export default withRouter(
  React.memo<EdgeClusterManagementProps>(
    ({
      match: {
        params: { projectId },
      },
    }) => {
      if (!projectId) {
        throw new Error('project ID is requied. Entered URL is incorrect');
      }

      return (
        <QueryRenderer<EdgeClusterManagementQuery>
          environment={RelayEnvironment}
          query={graphql`
            query EdgeClusterManagementQuery($projectId: ID!) {
              user {
                ...EdgeClusterManagementContainer_user
              }
            }
          `}
          variables={{ projectId }}
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
    },
  ),
);
