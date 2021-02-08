import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ProjectManagementContainer_user } from './__generated__/ProjectManagementContainer_user.graphql';
import ProjectsView from './ProjectsView';

interface ProjectManagementContainerProps extends RouteComponentProps {
  user: ProjectManagementContainer_user;
}

const ProjectManagementContainer = React.memo<ProjectManagementContainerProps>(({ history, user }) => {
  const createProject = () => {
    history.push('/project/create');
  };

  const handleProjectClick = (id: string) => {
    history.push(`/project/${id}`);
  };

  return <ProjectsView user={user} onCreateProjectClick={createProject} onProjectClick={handleProjectClick} />;
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
      ...ProjectsView_user
    }
  `,
});
