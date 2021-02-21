import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import { EdgeNodeManagementContainer_user } from './__generated__/EdgeNodeManagementContainer_user.graphql';
import EdgeNodesTableView from '../views/table';
import EdgeNodesMap from '../views/map';

interface EdgeNodeManagementContainerProps {
  user: EdgeNodeManagementContainer_user;
}

const EdgeNodeManagementContainer = React.memo<EdgeNodeManagementContainerProps>(({ user }) => {
  return (
    <React.Fragment>
      <EdgeNodesTableView user={user} showCheckbox={false} />
      <EdgeNodesMap user={user} />
    </React.Fragment>
  );
});

export default createFragmentContainer(EdgeNodeManagementContainer, {
  user: graphql`
    fragment EdgeNodeManagementContainer_user on User {
      ...EdgeNodesTableView_user
      ...EdgeNodesMap_user
    }
  `,
});
