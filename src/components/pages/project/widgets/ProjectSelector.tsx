import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { QueryRenderer } from 'react-relay';

import { ProjectSelector_user } from './__generated__/ProjectSelector_user.graphql';
import { ProjectSelectorQuery } from './__generated__/ProjectSelectorQuery.graphql';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import ProjectsTable from './ProjectsTable';

interface ProjectSelectorContainerProps {
  user: ProjectSelector_user;
  onSelectProjectClick: (id: string) => void;
}

const ProjectSelectorContainer = React.memo<ProjectSelectorContainerProps>(({ user, onSelectProjectClick }) => {
  return (
    <React.Fragment>
      <ProjectsTable user={user} onProjectClick={onSelectProjectClick} showCheckbox={false} />
    </React.Fragment>
  );
});

const ProjectSelectorContainerRelayed = createFragmentContainer(ProjectSelectorContainer, {
  user: graphql`
    fragment ProjectSelector_user on User {
      ...ProjectsTable_user
    }
  `,
});

interface ProjectSelectorProps {
  onSelectProjectClick: (id: string) => void;
}

export default React.memo<ProjectSelectorProps>(({ onSelectProjectClick }) => {
  return (
    <QueryRenderer<ProjectSelectorQuery>
      environment={RelayEnvironment}
      query={graphql`
        query ProjectSelectorQuery {
          user {
            ...ProjectSelector_user
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props && props.user) {
          return <ProjectSelectorContainerRelayed user={props.user} onSelectProjectClick={onSelectProjectClick} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
