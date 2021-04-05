import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ProjectDetails_user } from './__generated__/ProjectDetails_user.graphql';
import { ProjectDetailsQuery } from './__generated__/ProjectDetailsQuery.graphql';

import { RelayEnvironment } from '../../../framework/relay';
import LoadingContainer from '../../common/loading';
import GenericErrorContainer from '../../common/generic-error';
import ProjectSummary from './widgets/ProjectSummary';

interface ProjectDetailsContainerProps {
  user: ProjectDetails_user;
}

const ProjectDetailsContainer = React.memo<ProjectDetailsContainerProps>(({ user }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newSelectedTab: any) => {
    setSelectedTab(newSelectedTab);
  };

  return (
    <React.Fragment>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label={t('summary.title')} />
      </Tabs>
      {user.project && selectedTab === 0 && <ProjectSummary project={user.project} />}
    </React.Fragment>
  );
});

const ProjectDetailsContainerRelayed = createFragmentContainer(ProjectDetailsContainer, {
  user: graphql`
    fragment ProjectDetails_user on User {
      project(projectID: $projectID) {
        ...ProjectSummary_project
      }
    }
  `,
});

interface ProjectDetailsProps
  extends RouteComponentProps<{
    projectID?: string;
  }> {}

export default withRouter(
  React.memo<ProjectDetailsProps>(
    ({
      match: {
        params: { projectID },
      },
    }) => {
      if (!projectID) {
        throw new Error('project ID is requied. Entered URL is incorrect');
      }

      return (
        <QueryRenderer<ProjectDetailsQuery>
          environment={RelayEnvironment}
          query={graphql`
            query ProjectDetailsQuery($projectID: ID!) {
              user {
                ...ProjectDetails_user
              }
            }
          `}
          variables={{ projectID }}
          render={({ props, error }) => {
            if (props && props.user) {
              return <ProjectDetailsContainerRelayed user={props.user} />;
            } else if (error) {
              return <GenericErrorContainer message={error.message} />;
            }

            return <LoadingContainer />;
          }}
        />
      );
    },
  ),
);
