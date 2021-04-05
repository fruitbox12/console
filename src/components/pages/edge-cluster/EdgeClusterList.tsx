import React from 'react';
import { connect, useDispatch } from 'react-redux';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Environment } from 'relay-runtime';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { EdgeClusterList_user } from './__generated__/EdgeClusterList_user.graphql';
import { EdgeClusterListQuery } from './__generated__/EdgeClusterListQuery.graphql';

import { RelayEnvironment } from '../../../framework/relay';
import LoadingContainer from '../../common/loading';
import GenericErrorContainer from '../../common/generic-error';
import { add, NotificationType, Notification } from '../../common/notification-handler/NotificationHandlerSlice';
import EdgeClustersTable from './widgets/EdgeClustersTable';
import { DeleteEdgeCluster } from '../../../framework/relay/mutations';

export const enNZTranslation = {
  deletionSuccessMesssage: 'Successfully deleted the edge cluster',
};

const styles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface EdgeClusterListContainerProps
  extends RouteComponentProps<{
    projectID?: string;
  }> {
  user: EdgeClusterList_user;
  readonly relay: {
    environment: Environment;
  };
}

const EdgeClusterListContainer = React.memo<EdgeClusterListContainerProps>(
  ({
    history,
    user,
    relay: { environment },
    match: {
      params: { projectID },
    },
  }) => {
    const classes = styles();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const createEdgeCluster = () => {
      history.push(`/${projectID}/edgecluster/create`);
    };

    const handleEdgeClusterClick = (id: string) => {
      history.push(`/${projectID}/edgecluster/${id}`);
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
              const notification: Notification = { type: NotificationType.Success, message: t('edgeClusterList.deletionSuccessMesssage') };

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
        <EdgeClustersTable user={user} onEdgeClusterClick={handleEdgeClusterClick} showCheckbox={true} onDeleteIconClick={handleDeleteIconClick} />

        <Fab color="primary" aria-label="add" className={classes.fab} size="medium" onClick={createEdgeCluster}>
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  },
);

const EdgeClusterListContainerRelayed = createFragmentContainer(connect()(withRouter(EdgeClusterListContainer)), {
  user: graphql`
    fragment EdgeClusterList_user on User {
      edgeClusters(first: 1000, projectIDs: [$projectID]) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
          }
        }
      }
      ...EdgeClustersTable_user
    }
  `,
});

interface EdgeClusterListProps
  extends RouteComponentProps<{
    projectID?: string;
  }> {}

export default withRouter(
  React.memo<EdgeClusterListProps>(
    ({
      match: {
        params: { projectID },
      },
    }) => {
      if (!projectID) {
        throw new Error('project ID is requied. Entered URL is incorrect');
      }

      return (
        <QueryRenderer<EdgeClusterListQuery>
          environment={RelayEnvironment}
          query={graphql`
            query EdgeClusterListQuery($projectID: ID!) {
              user {
                ...EdgeClusterList_user
              }
            }
          `}
          variables={{ projectID }}
          render={({ props, error }) => {
            if (props && props.user) {
              return <EdgeClusterListContainerRelayed user={props.user} />;
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
