import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { EdgeNodesTableView_user } from './__generated__/EdgeNodesTableView_user.graphql';
import styles from './Styles';
import EdgeNodeTableHeader from './EdgeNodeTableHeader';
import EdgeNodeRowView from './EdgeNodeRowView';

interface EdgeNodesTableViewProps {
  user: EdgeNodesTableView_user;
  showCheckbox: boolean;
}

export const EdgeNodesTableView = React.memo<EdgeNodesTableViewProps>(({ user, showCheckbox }) => {
  const classes = styles();

  const getEdgeNodesTableView = (user: EdgeNodesTableView_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.edgeCluster.nodes.map((node) => (
      // @ts-ignore: Object is possibly 'null'.
      <EdgeNodeRowView key={node.NodeInfo.MachineID} edgeNode={node} showCheckbox={showCheckbox} />
    ));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EdgeNodeTableHeader showCheckbox={showCheckbox} />
            <TableBody>{getEdgeNodesTableView(user)}</TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
});

export default createFragmentContainer(EdgeNodesTableView, {
  user: graphql`
    fragment EdgeNodesTableView_user on User {
      edgeCluster(edgeClusterID: $edgeClusterID) {
        id
        nodes {
          NodeInfo {
            MachineID
          }
          ...EdgeNodeRowView_edgeNode
        }
      }
    }
  `,
});
