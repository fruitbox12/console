import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { edgeClusterProp } from './PropTypes';
import Styles from './Styles';

const EdgeClusterView = ({ edgeCluster: { name, clusterSecret, clusterType } }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link}>{name}</Link>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography variant="body1" gutterBottom>
          {clusterSecret}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Typography variant="body1" gutterBottom>
          {clusterType}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

EdgeClusterView.propTypes = {
  edgeCluster: edgeClusterProp.isRequired,
};

export default EdgeClusterView;
