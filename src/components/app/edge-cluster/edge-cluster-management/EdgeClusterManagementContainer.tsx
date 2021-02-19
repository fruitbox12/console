import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { EdgeClusterManagementContainer_user } from './__generated__/EdgeClusterManagementContainer_user.graphql';
import styles from './Styles';
import EdgeClustersTableView from '../views/table/EdgeClustersTableView';

interface EdgeClusterManagementContainerProps extends RouteComponentProps {
  user: EdgeClusterManagementContainer_user;
}

const EdgeClusterManagementContainer = React.memo<EdgeClusterManagementContainerProps>(({ history, user }) => {
  const classes = styles();

  const createEdgeCluster = () => {
    history.push('/edgeCluster/create');
  };

  const handleEdgeClusterClick = (id: string) => {
    history.push(`/edgeCluster/${id}`);
  };

  return (
    <React.Fragment>
      <EdgeClustersTableView user={user} onEdgeClusterClick={handleEdgeClusterClick} />

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={createEdgeCluster}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
});

export default createFragmentContainer(withRouter(EdgeClusterManagementContainer), {
  user: graphql`
    fragment EdgeClusterManagementContainer_user on User {
      edgeClusters(first: 1000, projectIDs: [$projectId]) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
          }
        }
      }
      ...EdgeClustersTableView_user
    }
  `,
});
