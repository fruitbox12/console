import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { EdgeNodeManagementContainer_user } from './__generated__/EdgeNodeManagementContainer_user.graphql';
import styles from './Styles';
import EdgeNodesTableView from '../views/table/EdgeNodesTableView';

interface EdgeNodeManagementContainerProps
  extends RouteComponentProps<{
    projectId?: string;
  }> {
  user: EdgeNodeManagementContainer_user;
}

const EdgeNodeManagementContainer = React.memo<EdgeNodeManagementContainerProps>(
  ({
    history,
    user,
    match: {
      params: { projectId },
    },
  }) => {
    const classes = styles();

    const createEdgeCluster = () => {
      history.push(`/${projectId}/edgecluster/create`);
    };

    return (
      <React.Fragment>
        <EdgeNodesTableView user={user} showCheckbox={false} />

        <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={createEdgeCluster}>
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  },
);

export default createFragmentContainer(withRouter(EdgeNodeManagementContainer), {
  user: graphql`
    fragment EdgeNodeManagementContainer_user on User {
      ...EdgeNodesTableView_user
    }
  `,
});
