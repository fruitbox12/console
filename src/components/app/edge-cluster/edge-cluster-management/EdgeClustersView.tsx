import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { EdgeClustersView_user } from './__generated__/EdgeClustersView_user.graphql';
import Styles from './Styles';
import EdgeClusterTableHeader from './EdgeClusterTableHeader';
import EdgeClusterView from './EdgeClusterView';

interface EdgeClustersViewProps {
  user: EdgeClustersView_user;
  onEdgeClusterClick: (id: string) => void;
  onCreateEdgeClusterClick: () => void;
}

export const EdgeClustersView = React.memo<EdgeClustersViewProps>(({ user, onEdgeClusterClick, onCreateEdgeClusterClick }) => {
  const classes = Styles();

  const getEdgeClustersView = (user: EdgeClustersView_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.edgeClusters.edges.map((edge) => (
      // @ts-ignore: Object is possibly 'null'.
      <EdgeClusterView key={edge.node.id} edgeCluster={edge.node} onEdgeClusterClick={onEdgeClusterClick} />
    ));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EdgeClusterTableHeader />
            <TableBody>{getEdgeClustersView(user)}</TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateEdgeClusterClick}>
        <AddIcon />
      </Fab>
    </div>
  );
});

export default createFragmentContainer(EdgeClustersView, {
  user: graphql`
    fragment EdgeClustersView_user on User {
      edgeClusters(first: 1000) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
            ...EdgeClusterView_edgeCluster
          }
        }
      }
    }
  `,
});
