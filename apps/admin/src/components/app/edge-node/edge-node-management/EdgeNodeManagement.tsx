import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import EdgeNodeManagementContainer from './EdgeNodeManagementContainer';

import { EdgeNodeManagementQuery } from './__generated__/EdgeNodeManagementQuery.graphql';

interface EdgeNodeManagementProps
  extends RouteComponentProps<{
    edgeClusterId?: string;
  }> {}

export default withRouter(
  React.memo<EdgeNodeManagementProps>(
    ({
      match: {
        params: { edgeClusterId },
      },
    }) => {
      if (!edgeClusterId) {
        throw new Error('edge cluster ID is requied. Entered URL is incorrect');
      }

      return (
        <QueryRenderer<EdgeNodeManagementQuery>
          environment={RelayEnvironment}
          query={graphql`
            query EdgeNodeManagementQuery($edgeClusterID: ID!) {
              user {
                ...EdgeNodeManagementContainer_user
              }
            }
          `}
          variables={{ edgeClusterID: edgeClusterId }}
          render={({ props, error }) => {
            if (props && props.user) {
              return <EdgeNodeManagementContainer user={props.user} />;
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
