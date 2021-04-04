import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {} from 'react-redux';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Environment } from 'relay-runtime';

import { CreateProjectView, UpdateProjectView, Values } from './SetProjectView';
import { CreateProject, UpdateProject } from '../../../../framework/relay/mutations';
import { add, NotificationType, Notification } from '../../../../components/common/notification-handler/NotificationHandlerSlice';

import { SetProjectContainer_user } from './__generated__/SetProjectContainer_user.graphql';

interface SetProjectContainerProps extends RouteComponentProps {
  user: SetProjectContainer_user;
  readonly relay: {
    environment: Environment;
  };
}

export const SetProjectContainer: React.FC<SetProjectContainerProps> = ({ history, user, relay: { environment } }) => {
  const dispatch = useDispatch();
  const { project } = user;

  const setProject = (values: Values) => {
    if (project) {
      // @ts-ignore: Object is possibly 'undefined'.
      UpdateProject(environment, { projectID: project.id, name: values.name.trim() }, user, {
        onSuccess: () => {
          const notification: Notification = { type: NotificationType.Success, message: 'Successfully updated the project' };

          dispatch(add(notification));

          history.push('/project');
        },
        onError: (errorMessage: string) => {
          const notification: Notification = { type: NotificationType.Error, message: errorMessage };

          dispatch(add(notification));
        },
      });
    } else {
      // @ts-ignore: Object is possibly 'undefined'.
      CreateProject(environment, { name: values.name.trim() }, null, {
        onSuccess: () => {
          const notification: Notification = { type: NotificationType.Success, message: 'Successfully created the project' };

          dispatch(add(notification));

          history.push('/project');
        },
        onError: (errorMessage: string) => {
          const notification: Notification = { type: NotificationType.Error, message: errorMessage };

          dispatch(add(notification));
        },
      });
    }
  };

  const cancel = () => history.push('/project');

  if (project) {
    return <UpdateProjectView project={project} onSubmit={setProject} onCancelButtonClick={cancel} />;
  }

  return <CreateProjectView onSubmit={setProject} onCancelButtonClick={cancel} />;
};

export default createFragmentContainer(connect()(withRouter(SetProjectContainer)), {
  user: graphql`
    fragment SetProjectContainer_user on User {
      id
      project(projectID: $projectID) @include(if: $isUpdating) {
        id
        ...SetProjectView_project
      }
    }
  `,
});
