import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import ProjectManagementContainer from './ProjectManagementContainer';

import { ProjectManagementQuery } from './__generated__/ProjectManagementQuery.graphql';

export default React.memo(() => {
  return (
    <QueryRenderer<ProjectManagementQuery>
      environment={RelayEnvironment}
      query={graphql`
        query ProjectManagementQuery {
          user {
            ...ProjectManagementContainer_user
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        if (props && props.user) {
          return <ProjectManagementContainer user={props.user} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
