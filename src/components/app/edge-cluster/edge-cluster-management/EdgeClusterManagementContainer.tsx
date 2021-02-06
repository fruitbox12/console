import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { EdgeClusterManagementContainer_user } from './__generated__/EdgeClusterManagementContainer_user.graphql';
import EdgeClustersView from './EdgeClustersView';

interface EdgeClusterManagementContainerProps extends RouteComponentProps {
  user: EdgeClusterManagementContainer_user;
}

const EdgeClusterManagementContainer = React.memo<EdgeClusterManagementContainerProps>(({ history, user }) => {
  const createEdgeCluster = () => {
    history.push('/edgeCluster/create');
  };

  const handleEdgeClusterClick = (id: string) => {
    history.push(`/edgeCluster/${id}`);
  };

  return <EdgeClustersView user={user} onCreateEdgeClusterClick={createEdgeCluster} onEdgeClusterClick={handleEdgeClusterClick} />;
});

export default createFragmentContainer(withRouter(EdgeClusterManagementContainer), {
  user: graphql`
    fragment EdgeClusterManagementContainer_user on User {
      edgeClusters(first: 1000) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
          }
        }
      }
      ...EdgeClustersView_user
    }
  `,
});
