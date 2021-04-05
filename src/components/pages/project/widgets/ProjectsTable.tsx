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

import { ProjectsTable_user } from './__generated__/ProjectsTable_user.graphql';
import { ProjectsTable_project } from './__generated__/ProjectsTable_project.graphql';

export const enNZTranslation = {
  name: 'Name',
};

const styles = makeStyles((theme) => ({
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
        <TableCell>{t('projectsTable.name')}</TableCell>
      </TableRow>
    </TableHead>
  );
});

interface ProjectRowProps {
  project: ProjectsTable_project;
  onProjectClick: (id: string) => void;
  showCheckbox: boolean;
  selected: boolean;
  onSelectedClick: (id: string) => void;
}

const ProjectRow = React.memo<ProjectRowProps>(({ project: { id, name }, onProjectClick, showCheckbox, selected, onSelectedClick }) => {
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
          <Link className={classes.link} onClick={() => onProjectClick(id)}>
            {name}
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
});

const ProjectRowRelayed = createFragmentContainer(ProjectRow, {
  project: graphql`
    fragment ProjectsTable_project on Project {
      id
      name
    }
  `,
});

interface ProjectsTableProps {
  user: ProjectsTable_user;
  onProjectClick: (id: string) => void;
  showCheckbox: boolean;
  onDeleteIconClick?: (ids: string[]) => void;
}

export const ProjectsTable = React.memo<ProjectsTableProps>(({ user, onProjectClick, showCheckbox, onDeleteIconClick }) => {
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
    if (onDeleteIconClick) {
      onDeleteIconClick(selectedItems);
    }
  };

  const getProjectsTable = (user: ProjectsTable_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.projects.edges.map((edge) => (
      <ProjectRowRelayed
        key={edge?.node?.id}
        // @ts-ignore: Object is possibly 'null'.
        project={edge?.node}
        onProjectClick={onProjectClick}
        showCheckbox={showCheckbox}
        selected={!!selectedItems.find((item) => item === edge?.node?.id)}
        onSelectedClick={handleSelectedClick}
      />
    ));
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.tableWrapper}>
        <Table size="small">
          <Header showCheckbox={showCheckbox} deleteIconEnabled={selectedItems.length > 0} onDeleteIconClick={handleDeleteIconClick} />
          <TableBody>{getProjectsTable(user)}</TableBody>
        </Table>
      </div>
    </Paper>
  );
});

export default createFragmentContainer(ProjectsTable, {
  user: graphql`
    fragment ProjectsTable_user on User {
      projects(first: 1000) @connection(key: "User_projects") {
        edges {
          node {
            id
            ...ProjectsTable_project
          }
        }
      }
    }
  `,
});
