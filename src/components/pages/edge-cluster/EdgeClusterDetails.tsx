import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { QueryRenderer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EdgeClusterDetails_user } from './__generated__/EdgeClusterDetails_user.graphql';
import { EdgeClusterDetailsQuery } from './__generated__/EdgeClusterDetailsQuery.graphql';

import { RelayEnvironment } from '../../../framework/relay';
import LoadingContainer from '../../common/loading';
import GenericErrorContainer from '../../common/generic-error';
import EdgeClusterSummary from './widgets/EdgeClusterSummary';
import EdgeClusterNodes from './widgets/EdgeClusterNodes';
import EdgeClusterWorkloads from './widgets/EdgeClusterWorkloads';

interface EdgeClusterDetailsContainerProps {
  user: EdgeClusterDetails_user;
}

const EdgeClusterDetailsContainer = React.memo<EdgeClusterDetailsContainerProps>(({ user }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newSelectedTab: any) => {
    setSelectedTab(newSelectedTab);
  };

  return (
    <React.Fragment>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label={t('summary.title')} />
        <Tab label={t('nodes.title')} />
        <Tab label={t('workloads.title')} />
      </Tabs>
      {user.edgeCluster && selectedTab === 0 && <EdgeClusterSummary edgeCluster={user.edgeCluster} />}
      {user.edgeCluster && selectedTab === 1 && <EdgeClusterNodes edgeCluster={user.edgeCluster} />}
      {user.edgeCluster && selectedTab === 2 && <EdgeClusterWorkloads edgeCluster={user.edgeCluster} />}
    </React.Fragment>
  );
});

const EdgeClusterDetailsContainerRelayed = createFragmentContainer(EdgeClusterDetailsContainer, {
  user: graphql`
    fragment EdgeClusterDetails_user on User {
      edgeCluster(edgeClusterID: $edgeClusterID) {
        ...EdgeClusterSummary_edgeCluster
        ...EdgeClusterNodes_edgeCluster
        ...EdgeClusterWorkloads_edgeCluster
      }
    }
  `,
});

interface EdgeClusterDetailsProps
  extends RouteComponentProps<{
    edgeClusterID?: string;
  }> {}

export default withRouter(
  React.memo<EdgeClusterDetailsProps>(
    ({
      match: {
        params: { edgeClusterID },
      },
    }) => {
      if (!edgeClusterID) {
        throw new Error('edge cluster ID is requied. Entered URL is incorrect');
      }

      return (
        <QueryRenderer<EdgeClusterDetailsQuery>
          environment={RelayEnvironment}
          query={graphql`
            query EdgeClusterDetailsQuery($edgeClusterID: ID!) {
              user {
                ...EdgeClusterDetails_user
              }
            }
          `}
          variables={{ edgeClusterID }}
          render={({ props, error }) => {
            if (props && props.user) {
              return <EdgeClusterDetailsContainerRelayed user={props.user} />;
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
