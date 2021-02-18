import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { ProjectRowView_project } from './__generated__/ProjectRowView_project.graphql';
import styles from './Styles';

interface ProjectRowViewProps {
  project: ProjectRowView_project;
  onProjectClick: (id: string) => void;
}

export const ProjectRowView = React.memo<ProjectRowViewProps>(({ project: { id, name }, onProjectClick }) => {
  const classes = styles();

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

export default createFragmentContainer(ProjectRowView, {
  project: graphql`
    fragment ProjectRowView_project on Project {
      id
      name
    }
  `,
});
