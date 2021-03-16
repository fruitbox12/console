import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { ProjectManagementContainer_user } from './__generated__/ProjectManagementContainer_user.graphql';
import styles from './Styles';
import ProjectsTableView from '../views/table';

interface ProjectManagementContainerProps extends RouteComponentProps {
  user: ProjectManagementContainer_user;
}

const ProjectManagementContainer = React.memo<ProjectManagementContainerProps>(({ history, user }) => {
  const classes = styles();
  const createProject = () => {
    history.push('/project/create');
  };

  const handleProjectClick = (id: string) => {
    history.push(`/project/${id}`);
  };

  return (
    <React.Fragment>
      <ProjectsTableView user={user} onProjectClick={handleProjectClick} showCheckbox={false} />
      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={createProject}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
});

export default createFragmentContainer(withRouter(ProjectManagementContainer), {
  user: graphql`
    fragment ProjectManagementContainer_user on User {
      projects(first: 1000) @connection(key: "User_projects") {
        edges {
          node {
            id
          }
        }
      }
      ...ProjectsTableView_user
    }
  `,
});
