import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { EdgeClusterView_edgeCluster } from './__generated__/EdgeClusterView_edgeCluster.graphql';
import Styles from './Styles';

interface EdgeClusterViewProps {
  edgeCluster: EdgeClusterView_edgeCluster;
  onEdgeClusterClick: (id: string) => void;
}

export const EdgeClusterView = React.memo<EdgeClusterViewProps>(({ edgeCluster: { id, name, clusterType, clusterSecret }, onEdgeClusterClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onEdgeClusterClick(id)}>
          {name}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {clusterType}
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {clusterSecret}
      </TableCell>
    </TableRow>
  );
});

export default createFragmentContainer(EdgeClusterView, {
  edgeCluster: graphql`
    fragment EdgeClusterView_edgeCluster on EdgeCluster {
      id
      name
      clusterType
      clusterSecret
    }
  `,
});
