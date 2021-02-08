import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { ProjectView_project } from './__generated__/ProjectView_project.graphql';
import Styles from './Styles';

interface ProjectViewProps {
  project: ProjectView_project;
  onProjectClick: (id: string) => void;
}

export const ProjectView = React.memo<ProjectViewProps>(({ project: { id, name }, onProjectClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onProjectClick(id)}>
          {name}
        </Link>
      </TableCell>
    </TableRow>
  );
});

export default createFragmentContainer(ProjectView, {
  project: graphql`
    fragment ProjectView_project on Project {
      id
      name
    }
  `,
});
