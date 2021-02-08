import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { ProjectsView_user } from './__generated__/ProjectsView_user.graphql';
import Styles from './Styles';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectView from './ProjectView';

interface ProjectsViewProps {
  user: ProjectsView_user;
  onProjectClick: (id: string) => void;
  onCreateProjectClick: () => void;
}

export const ProjectsView = React.memo<ProjectsViewProps>(({ user, onProjectClick, onCreateProjectClick }) => {
  const classes = Styles();

  const getProjectsView = (user: ProjectsView_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.projects.edges.map((edge) => <ProjectView key={edge.node.id} project={edge.node} onProjectClick={onProjectClick} />);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <ProjectTableHeader />
            <TableBody>{getProjectsView(user)}</TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateProjectClick}>
        <AddIcon />
      </Fab>
    </div>
  );
});

export default createFragmentContainer(ProjectsView, {
  user: graphql`
    fragment ProjectsView_user on User {
      projects(first: 1000) @connection(key: "User_projects") {
        edges {
          node {
            id
            ...ProjectView_project
          }
        }
      }
    }
  `,
});
