import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import ProjectSelectorContainer from './ProjectSelectorContainer';

import { ProjectSelectorQuery } from './__generated__/ProjectSelectorQuery.graphql';

interface ProjectSelectorProps {
  onSelectProjectClick: () => void;
}

export default React.memo<ProjectSelectorProps>(({ onSelectProjectClick }) => {
  return (
    <QueryRenderer<ProjectSelectorQuery>
      environment={RelayEnvironment}
      query={graphql`
        query ProjectSelectorQuery {
          user {
            ...ProjectSelectorContainer_user
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props && props.user) {
          return <ProjectSelectorContainer user={props.user} onSelectProjectClick={onSelectProjectClick} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
