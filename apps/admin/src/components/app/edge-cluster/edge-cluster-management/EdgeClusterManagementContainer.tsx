import React from 'react';
import { connect, useDispatch } from 'react-redux';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Environment } from 'relay-runtime';

import { EdgeClusterManagementContainer_user } from './__generated__/EdgeClusterManagementContainer_user.graphql';
import styles from './Styles';
import EdgeClustersTableView from '../views/table';
import { DeleteEdgeCluster } from '../../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../../components/common/notification-handler/NotificationHandlerSlice';

interface EdgeClusterManagementContainerProps
  extends RouteComponentProps<{
    projectId?: string;
  }> {
  user: EdgeClusterManagementContainer_user;
  readonly relay: {
    environment: Environment;
  };
}

const EdgeClusterManagementContainer = React.memo<EdgeClusterManagementContainerProps>(
  ({
    history,
    user,
    relay: { environment },
    match: {
      params: { projectId },
    },
  }) => {
    const classes = styles();
    const dispatch = useDispatch();

    const createEdgeCluster = () => {
      history.push(`/${projectId}/edgecluster/create`);
    };

    const handleEdgeClusterClick = (id: string) => {
      history.push(`/${projectId}/edgecluster/${id}/node`);
    };

    const handleEdgeClusterEditClick = (id: string) => {
      history.push(`/${projectId}/edgecluster/${id}`);
    };

    const handleDeleteIconClick = (edgeClusterIDs: string[]) => {
      edgeClusterIDs.forEach((edgeClusterID) => {
        DeleteEdgeCluster(
          environment,
          {
            edgeClusterID,
          },
          user,
          {
            onSuccess: () => {
              const notification: Notification = { type: NotificationType.Success, message: 'Successfully deleted the edge cluster' };

              dispatch(add(notification));
            },
            onError: (errorMessage: string) => {
              const notification: Notification = { type: NotificationType.Error, message: errorMessage };

              dispatch(add(notification));
            },
          },
        );
      });
    };

    return (
      <React.Fragment>
        <EdgeClustersTableView
          user={user}
          onEdgeClusterClick={handleEdgeClusterClick}
          onEdgeClusterEditClick={handleEdgeClusterEditClick}
          showCheckbox={true}
          showEditButton={true}
          onDeleteIconClick={handleDeleteIconClick}
        />

        <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={createEdgeCluster}>
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  },
);

export default createFragmentContainer(connect()(withRouter(EdgeClusterManagementContainer)), {
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
