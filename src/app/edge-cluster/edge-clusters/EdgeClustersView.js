import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { edgeClustersProp } from './PropTypes';
import Styles from './Styles';
import EdgeClustersTableHeader from './EdgeClustersTableHeader';
import EdgeClusterView from './EdgeClusterView';

const EdgeClustersView = ({ edgeClusters, onCreateEdgeClusterClick }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EdgeClustersTableHeader />
            <TableBody>
              {edgeClusters.map(edgeCluster => (
                <EdgeClusterView key={edgeCluster.id} edgeCluster={edgeCluster} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateEdgeClusterClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

EdgeClustersView.propTypes = {
  edgeClusters: edgeClustersProp.isRequired,
  onCreateEdgeClusterClick: PropTypes.func.isRequired,
};

export default EdgeClustersView;
