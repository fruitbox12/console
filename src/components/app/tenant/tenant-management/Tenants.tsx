import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import TenantManagementContainer from './TenantManagementContainer';

import { TenantsQuery } from './__generated__/TenantsQuery.graphql';

export default React.memo(() => {
  return (
    <QueryRenderer<TenantsQuery>
      environment={RelayEnvironment}
      query={graphql`
        query TenantsQuery {
          user {
            ...TenantManagementContainer_user
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props && props.user) {
          return <TenantManagementContainer user={props.user} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
