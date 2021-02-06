import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter } from 'react-router-dom';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import SetTenantContainer from './SetTenantContainer';

import { SetTenantQuery } from './__generated__/SetTenantQuery.graphql';

interface SetTenantProps {
  match: {
    params: {
      tenantId?: string;
    };
  };
}

const SetTenant = React.memo<SetTenantProps>(
  ({
    match: {
      params: { tenantId },
    },
  }) => {
    return (
      <QueryRenderer<SetTenantQuery>
        environment={RelayEnvironment}
        query={graphql`
          query SetTenantQuery($tenantId: ID!, $isUpdating: Boolean!) {
            user {
              ...SetTenantContainer_user
            }
          }
        `}
        variables={{
          tenantId: tenantId ? tenantId : 'No ID',
          isUpdating: !!tenantId,
        }}
        render={({ props, error }) => {
          if (props && props.user) {
            return <SetTenantContainer user={props.user} />;
          } else if (error) {
            return <GenericErrorContainer message={error.message} />;
          }

          return <LoadingContainer />;
        }}
      />
    );
  },
);

export default withRouter(SetTenant);
