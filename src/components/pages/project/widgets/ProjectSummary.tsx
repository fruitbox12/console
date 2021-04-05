import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ProjectSummary_project } from './__generated__/ProjectSummary_project.graphql';
import ProjectEditName from './ProjectEditName';

export const enNZTranslation = {
  projectBasics: 'Project basics',
  name: 'Name',
  editProjectName: 'Edit project name',
};

const styles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  row: {
    height: 40,
  },
  titleCell: {
    borderBottom: 'none',
  },
  dialog: {
    minWidth: 500,
  },
}));

interface ProjectsSummaryProps {
  project: ProjectSummary_project;
}

export const ProjectsSummary = React.memo<ProjectsSummaryProps>(({ project: { id, name } }) => {
  const classes = styles();
  const { t } = useTranslation();
  const [openEditName, setOpenEditName] = useState(false);

  const handleEditNameOpenClick = () => {
    setOpenEditName(true);
  };

  const handleEditNameCloseClick = () => {
    setOpenEditName(false);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Table size="small">
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell className={classes.titleCell}>
                <Typography variant="h5">{t('projectSummary.projectBasics')}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell>{t('projectSummary.name')}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                <Tooltip title={<React.Fragment>{t('projectSummary.editProjectName')}</React.Fragment>}>
                  <IconButton color="inherit" onClick={handleEditNameOpenClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={openEditName} keepMounted onClose={handleEditNameCloseClick}>
        <DialogTitle className={classes.dialog}>{t('projectSummary.editProjectName')}</DialogTitle>
        <DialogContent>
          <ProjectEditName projectID={id} onClose={handleEditNameCloseClick} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
});

export default createFragmentContainer(ProjectsSummary, {
  project: graphql`
    fragment ProjectSummary_project on Project {
      id
      name
    }
  `,
});
