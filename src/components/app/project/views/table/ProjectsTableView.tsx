import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { ProjectsTableView_user } from './__generated__/ProjectsTableView_user.graphql';
import styles from './Styles';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectRowView from './ProjectRowView';

interface ProjectsTableViewProps {
  user: ProjectsTableView_user;
  onProjectClick: (id: string) => void;
}

export const ProjectsTableView = React.memo<ProjectsTableViewProps>(({ user, onProjectClick }) => {
  const classes = styles();

  const getProjectsTableView = (user: ProjectsTableView_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.projects.edges.map((edge) => <ProjectRowView key={edge.node.id} project={edge.node} onProjectClick={onProjectClick} />);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <ProjectTableHeader />
            <TableBody>{getProjectsTableView(user)}</TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
});

export default createFragmentContainer(ProjectsTableView, {
  user: graphql`
    fragment ProjectsTableView_user on User {
      projects(first: 1000) @connection(key: "User_projects") {
        edges {
          node {
            id
            ...ProjectRowView_project
          }
        }
      }
    }
  `,
});
