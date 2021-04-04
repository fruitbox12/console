import React from 'react';
import { connect, useDispatch } from 'react-redux';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Environment } from 'relay-runtime';

import { CreateEdgeClusterView, UpdateEdgeClusterView, Values } from './SetEdgeClusterView';
import { CreateEdgeCluster, UpdateEdgeCluster } from '../../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../../components/common/notification-handler/NotificationHandlerSlice';

import { SetEdgeClusterContainer_user } from './__generated__/SetEdgeClusterContainer_user.graphql';

interface SetEdgeClusterContainerProps
  extends RouteComponentProps<{
    projectID?: string;
  }> {
  user: SetEdgeClusterContainer_user;
  readonly relay: {
    environment: Environment;
  };
}

export const SetEdgeClusterContainer: React.FC<SetEdgeClusterContainerProps> = ({
  history,
  user,
  relay: { environment },
  match: {
    params: { projectID },
  },
}) => {
  const dispatch = useDispatch();
  const { edgeCluster } = user;

  const setEdgeCluster = (values: Values) => {
    if (edgeCluster) {
      UpdateEdgeCluster(
        environment,
        {
          projectID,
          edgeClusterID: edgeCluster.id,
          name: values?.name?.trim(),
          clusterType: values?.type?.trim(),
          clusterSecret: values?.secret?.trim(),
        },
        user,
        {
          onSuccess: () => {
            const notification: Notification = { type: NotificationType.Success, message: 'Successfully updated the edge cluster' };

            dispatch(add(notification));

            history.push(`/${projectID}/edgecluster`);
          },
          onError: (errorMessage: string) => {
            const notification: Notification = { type: NotificationType.Error, message: errorMessage };

            dispatch(add(notification));
          },
        },
      );
    } else {
      CreateEdgeCluster(
        environment,
        {
          projectID,
          name: values?.name?.trim(),
          clusterType: values?.type?.trim(),
          clusterSecret: values?.secret?.trim(),
        },
        null,
        {
          onSuccess: () => {
            const notification: Notification = { type: NotificationType.Success, message: 'Successfully created the edge custer' };

            dispatch(add(notification));

            history.push(`/${projectID}/edgecluster`);
          },
          onError: (errorMessage: string) => {
            const notification: Notification = { type: NotificationType.Error, message: errorMessage };

            dispatch(add(notification));
          },
        },
      );
    }
  };

  const cancel = () => history.push(`/${projectID}/edgecluster`);

  if (edgeCluster) {
    return <UpdateEdgeClusterView edgeCluster={edgeCluster} onSubmit={setEdgeCluster} onCancelButtonClick={cancel} />;
  }

  return <CreateEdgeClusterView onSubmit={setEdgeCluster} onCancelButtonClick={cancel} />;
};

export default createFragmentContainer(connect()(withRouter(SetEdgeClusterContainer)), {
  user: graphql`
    fragment SetEdgeClusterContainer_user on User {
      id
      edgeCluster(edgeClusterID: $edgeClusterID) @include(if: $isUpdating) {
        id
        ...SetEdgeClusterView_edgeCluster
      }
    }
  `,
});
