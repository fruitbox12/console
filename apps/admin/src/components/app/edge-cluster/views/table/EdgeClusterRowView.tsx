import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { EdgeClusterRowView_edgeCluster } from './__generated__/EdgeClusterRowView_edgeCluster.graphql';
import styles from './Styles';

interface EdgeClusterRowViewProps {
  edgeCluster: EdgeClusterRowView_edgeCluster;
  onEdgeClusterClick: (id: string) => void;
  onEdgeClusterEditClick: (id: string) => void;
  showCheckbox: boolean;
  showEditButton: boolean;
  selected: boolean;
  onSelectedClick: (id: string) => void;
}

export const EdgeClusterRowView = React.memo<EdgeClusterRowViewProps>(
  ({
    edgeCluster: { id, name, clusterType, clusterSecret },
    onEdgeClusterClick,
    onEdgeClusterEditClick,
    showCheckbox,
    showEditButton,
    selected,
    onSelectedClick,
  }) => {
    const classes = styles();

    return (
      <TableRow className={classes.row}>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={() => onSelectedClick(id)} />
          </TableCell>
        )}
        <TableCell component="th" scope="row" padding="none">
          <div className={classes.nameAndEditCell}>
            <Link className={classes.link} onClick={() => onEdgeClusterClick(id)}>
              {name}
            </Link>
            {showEditButton && (
              <IconButton color="inherit" aria-label="edit" onClick={() => onEdgeClusterEditClick(id)}>
                <EditIcon />
              </IconButton>
            )}
          </div>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {clusterType}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {clusterSecret}
        </TableCell>
      </TableRow>
    );
  },
);

export default createFragmentContainer(EdgeClusterRowView, {
  edgeCluster: graphql`
    fragment EdgeClusterRowView_edgeCluster on EdgeCluster {
      id
      name
      clusterType
      clusterSecret
    }
  `,
});
