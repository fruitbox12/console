import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { TenantManagementContainer_user } from './__generated__/TenantManagementContainer_user.graphql';
import TenantsView from './TenantsView';

interface TenantManagementContainerProps extends RouteComponentProps {
  user: TenantManagementContainer_user;
}

const TenantManagementContainer = React.memo<TenantManagementContainerProps>(({ history, user }) => {
  const createTenant = () => {
    history.push('/tenant/create');
  };

  const handleTenantClick = (id: string) => {
    history.push(`/tenant/${id}`);
  };

  return <TenantsView user={user} onCreateTenantClick={createTenant} onTenantClick={handleTenantClick} />;
});

export default createFragmentContainer(withRouter(TenantManagementContainer), {
  user: graphql`
    fragment TenantManagementContainer_user on User {
      tenants(first: 1000) @connection(key: "User_tenants") {
        edges {
          node {
            id
          }
        }
      }
      ...TenantsView_user
    }
  `,
});
