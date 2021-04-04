import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { EdgeClustersTable_user } from './__generated__/EdgeClustersTable_user.graphql';
import { EdgeClustersTable_edgeCluster } from './__generated__/EdgeClustersTable_edgeCluster.graphql';

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  link: {
    margin: theme.spacing(1),
  },
  row: {
    height: 40,
  },
  nameAndEditCell: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface HeaderProps {
  showCheckbox: boolean;
  deleteIconEnabled: boolean;
  onDeleteIconClick: () => void;
}

const Header = React.memo<HeaderProps>(({ showCheckbox, deleteIconEnabled, onDeleteIconClick }) => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <IconButton color="inherit" aria-label="delete" onClick={onDeleteIconClick} disabled={!deleteIconEnabled}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
        <TableCell>{t('name.title')}</TableCell>
        <TableCell>{t('type.title')}</TableCell>
        <TableCell>{t('numberOfNodes.title')}</TableCell>
      </TableRow>
    </TableHead>
  );
});

interface EdgeClusterRowProps {
  edgeCluster: EdgeClustersTable_edgeCluster;
  onEdgeClusterClick: (id: string) => void;
  showCheckbox: boolean;
  selected: boolean;
  onSelectedClick: (id: string) => void;
}

const EdgeClusterRow = React.memo<EdgeClusterRowProps>(
  ({ edgeCluster: { id, name, clusterType, nodes }, onEdgeClusterClick, showCheckbox, selected, onSelectedClick }) => {
    const classes = styles();

    return (
      <TableRow className={classes.row}>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={() => onSelectedClick(id)} />
          </TableCell>
        )}
        <TableCell>
          <div className={classes.nameAndEditCell}>
            <Link className={classes.link} onClick={() => onEdgeClusterClick(id)}>
              {name}
            </Link>
          </div>
        </TableCell>
        <TableCell>{clusterType}</TableCell>
        <TableCell>{nodes.length}</TableCell>
      </TableRow>
    );
  },
);

const EdgeClusterRowRelayed = createFragmentContainer(EdgeClusterRow, {
  edgeCluster: graphql`
    fragment EdgeClustersTable_edgeCluster on EdgeCluster {
      id
      name
      clusterType
      nodes {
        metadata {
          id
        }
      }
    }
  `,
});

interface EdgeClustersTableProps {
  user: EdgeClustersTable_user;
  onEdgeClusterClick: (id: string) => void;
  showCheckbox: boolean;
  onDeleteIconClick: (ids: string[]) => void;
}

export const EdgeClustersTable = React.memo<EdgeClustersTableProps>(({ user, onEdgeClusterClick, showCheckbox, onDeleteIconClick }) => {
  const classes = styles();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectedClick = (id: string) => {
    const foundItem = selectedItems.find((item) => item === id);

    if (foundItem) {
      setSelectedItems(selectedItems.filter((item) => item !== foundItem));
    } else {
      setSelectedItems(selectedItems.concat(id));
    }
  };

  const handleDeleteIconClick = () => {
    onDeleteIconClick(selectedItems);
  };

  const getEdgeClustersTable = (user: EdgeClustersTable_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.edgeClusters.edges.map((edge) => (
      <EdgeClusterRowRelayed
        key={edge?.node?.id}
        // @ts-ignore: Object is possibly 'null'.
        edgeCluster={edge?.node}
        onEdgeClusterClick={onEdgeClusterClick}
        showCheckbox={showCheckbox}
        selected={!!selectedItems.find((item) => item === edge?.node?.id)}
        onSelectedClick={handleSelectedClick}
      />
    ));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table size="small">
            <Header showCheckbox={showCheckbox} deleteIconEnabled={selectedItems.length > 0} onDeleteIconClick={handleDeleteIconClick} />
            <TableBody>{getEdgeClustersTable(user)}</TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
});

export default createFragmentContainer(EdgeClustersTable, {
  user: graphql`
    fragment EdgeClustersTable_user on User {
      edgeClusters(first: 1000, projectIDs: [$projectID]) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
            ...EdgeClustersTable_edgeCluster
          }
        }
      }
    }
  `,
});
