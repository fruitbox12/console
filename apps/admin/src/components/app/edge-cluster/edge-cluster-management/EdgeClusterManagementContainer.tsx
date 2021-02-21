import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { EdgeClusterManagementContainer_user } from './__generated__/EdgeClusterManagementContainer_user.graphql';
import styles from './Styles';
import EdgeClustersTableView from '../views/table';

interface EdgeClusterManagementContainerProps
  extends RouteComponentProps<{
    projectId?: string;
  }> {
  user: EdgeClusterManagementContainer_user;
}

const EdgeClusterManagementContainer = React.memo<EdgeClusterManagementContainerProps>(
  ({
    history,
    user,
    match: {
      params: { projectId },
    },
  }) => {
    const classes = styles();

    const createEdgeCluster = () => {
      history.push(`/${projectId}/edgecluster/create`);
    };

    const handleEdgeClusterClick = (id: string) => {
      history.push(`/${projectId}/edgecluster/${id}/node`);
    };

    const handleEdgeClusterEditClick = (id: string) => {
      history.push(`/${projectId}/edgecluster/${id}`);
    };

    return (
      <React.Fragment>
        <EdgeClustersTableView
          user={user}
          onEdgeClusterClick={handleEdgeClusterClick}
          onEdgeClusterEditClick={handleEdgeClusterEditClick}
          showCheckbox={false}
          showEditButton={true}
        />

        <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={createEdgeCluster}>
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  },
);

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
