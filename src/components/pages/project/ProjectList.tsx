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

import { ProjectList_user } from './__generated__/ProjectList_user.graphql';
import { ProjectListQuery } from './__generated__/ProjectListQuery.graphql';

import { RelayEnvironment } from '../../../framework/relay';
import LoadingContainer from '../../common/loading';
import GenericErrorContainer from '../../common/generic-error';
import { add, NotificationType, Notification } from '../../common/notification-handler/NotificationHandlerSlice';
import ProjectsTable from './widgets/ProjectsTable';
import { DeleteProject } from '../../../framework/relay/mutations';

export const enNZTranslation = {
  deletionSuccessMesssage: 'Successfully deleted the project',
};

const styles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface ProjectListContainerProps extends RouteComponentProps {
  user: ProjectList_user;
  readonly relay: {
    environment: Environment;
  };
}

const ProjectListContainer = React.memo<ProjectListContainerProps>(({ history, user, relay: { environment } }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const createProject = () => {
    history.push(`/project/create`);
  };

  const handleProjectClick = (id: string) => {
    history.push(`/project/${id}`);
  };

  const handleDeleteIconClick = (projectIDs: string[]) => {
    projectIDs.forEach((projectID) => {
      DeleteProject(
        environment,
        {
          projectID,
        },
        user,
        {
          onSuccess: () => {
            const notification: Notification = { type: NotificationType.Success, message: t('projectList.deletionSuccessMesssage') };

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
      <ProjectsTable user={user} onProjectClick={handleProjectClick} showCheckbox={true} onDeleteIconClick={handleDeleteIconClick} />

      <Fab color="primary" aria-label="add" className={classes.fab} size="medium" onClick={createProject}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
});

const ProjectListContainerRelayed = createFragmentContainer(connect()(withRouter(ProjectListContainer)), {
  user: graphql`
    fragment ProjectList_user on User {
      id
      projects(first: 1000) @connection(key: "User_projects") {
        edges {
          node {
            id
          }
        }
      }
      ...ProjectsTable_user
    }
  `,
});

export default React.memo(() => {
  return (
    <QueryRenderer<ProjectListQuery>
      environment={RelayEnvironment}
      query={graphql`
        query ProjectListQuery {
          user {
            ...ProjectList_user
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props && props.user) {
          return <ProjectListContainerRelayed user={props.user} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
