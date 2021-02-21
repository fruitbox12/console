import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { EdgeClustersTableView_user } from './__generated__/EdgeClustersTableView_user.graphql';
import styles from './Styles';
import EdgeClusterTableHeader from './EdgeClusterTableHeader';
import EdgeClusterRowView from './EdgeClusterRowView';

interface EdgeClustersTableViewProps {
  user: EdgeClustersTableView_user;
  onEdgeClusterClick: (id: string) => void;
  onEdgeClusterEditClick: (id: string) => void;
  showCheckbox: boolean;
  showEditButton: boolean;
}

export const EdgeClustersTableView = React.memo<EdgeClustersTableViewProps>(
  ({ user, onEdgeClusterClick, onEdgeClusterEditClick, showCheckbox, showEditButton }) => {
    const classes = styles();

    const getEdgeClustersTableView = (user: EdgeClustersTableView_user) => {
      // @ts-ignore: Object is possibly 'null'.
      return user.edgeClusters.edges.map((edge) => (
        <EdgeClusterRowView
          key={edge?.node?.id}
          // @ts-ignore: Object is possibly 'null'.
          edgeCluster={edge?.node}
          onEdgeClusterClick={onEdgeClusterClick}
          onEdgeClusterEditClick={onEdgeClusterEditClick}
          showCheckbox={showCheckbox}
          showEditButton={showEditButton}
        />
      ));
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
              <EdgeClusterTableHeader showCheckbox={showCheckbox} />
              <TableBody>{getEdgeClustersTableView(user)}</TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  },
);

export default createFragmentContainer(EdgeClustersTableView, {
  user: graphql`
    fragment EdgeClustersTableView_user on User {
      edgeClusters(first: 1000, projectIDs: [$projectId]) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
            ...EdgeClusterRowView_edgeCluster
          }
        }
      }
    }
  `,
});
