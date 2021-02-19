import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useSelector } from 'react-redux';
import { QueryRenderer } from 'react-relay';

import { RelayEnvironment } from '../../../../framework/relay';
import LoadingContainer from '../../../common/loading';
import GenericErrorContainer from '../../../common/generic-error';
import EdgeClusterManagementContainer from './EdgeClusterManagementContainer';

import { EdgeClusterManagementQuery } from './__generated__/EdgeClusterManagementQuery.graphql';
import { selectState as globalSelectState } from '../../../../framework/redux/GlobalSlice';

export default React.memo(() => {
  const { currentSelectedProject } = useSelector(globalSelectState);
  const projectId = currentSelectedProject ? currentSelectedProject.projectId : '';

  return (
    <QueryRenderer<EdgeClusterManagementQuery>
      environment={RelayEnvironment}
      query={graphql`
        query EdgeClusterManagementQuery($projectId: ID!) {
          user {
            ...EdgeClusterManagementContainer_user
          }
        }
      `}
      variables={{ projectId }}
      render={({ props, error }) => {
        if (props && props.user) {
          return <EdgeClusterManagementContainer user={props.user} />;
        } else if (error) {
          return <GenericErrorContainer message={error.message} />;
        }

        return <LoadingContainer />;
      }}
    />
  );
});
