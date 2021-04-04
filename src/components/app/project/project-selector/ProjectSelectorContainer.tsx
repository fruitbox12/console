import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useDispatch } from 'react-redux';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ProjectSelectorContainer_user } from './__generated__/ProjectSelectorContainer_user.graphql';
import ProjectsTableView from '../views/table';
import { changeSelectedProject } from '../../../../framework/redux/GlobalSlice';

interface ProjectSelectorContainerProps extends RouteComponentProps {
  user: ProjectSelectorContainer_user;
  onSelectProjectClick: (id: string) => void;
}

const ProjectSelectorContainer = React.memo<ProjectSelectorContainerProps>(({ user, onSelectProjectClick }) => {
  const dispatch = useDispatch();
  const handleProjectClick = (id: string) => {
    const selectedProject = user.projects?.edges?.map((edge) => edge?.node).find((project) => project?.id === id);

    if (selectedProject) {
      dispatch(
        changeSelectedProject({
          projectID: selectedProject.id,
          name: selectedProject.name,
        }),
      );
      onSelectProjectClick(id);
    }
  };

  return (
    <React.Fragment>
      <ProjectsTableView user={user} onProjectClick={handleProjectClick} showCheckbox={false} />
    </React.Fragment>
  );
});

export default createFragmentContainer(withRouter(ProjectSelectorContainer), {
  user: graphql`
    fragment ProjectSelectorContainer_user on User {
      projects(first: 1000) @connection(key: "User_projects") {
        edges {
          node {
            id
            name
          }
        }
      }
      ...ProjectsTableView_user
    }
  `,
});
