import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import SetProjectContainer from './SetProjectContainer';

import { SetProjectQuery } from './__generated__/SetProjectQuery.graphql';

interface SetProjectProps
  extends RouteComponentProps<{
    projectId?: string;
  }> {}

const SetProject = React.memo<SetProjectProps>(
  ({
    match: {
      params: { projectId },
    },
  }) => {
    return (
      <QueryRenderer<SetProjectQuery>
        environment={RelayEnvironment}
        query={graphql`
          query SetProjectQuery($projectId: ID!, $isUpdating: Boolean!) {
            user {
              ...SetProjectContainer_user
            }
          }
        `}
        variables={{
          projectId: projectId ? projectId : 'No ID',
          isUpdating: !!projectId,
        }}
        render={({ props, error }) => {
          if (props && props.user) {
            return <SetProjectContainer user={props.user} />;
          } else if (error) {
            return <GenericErrorContainer message={error.message} />;
          }

          return <LoadingContainer />;
        }}
      />
    );
  },
);

export default withRouter(SetProject);
