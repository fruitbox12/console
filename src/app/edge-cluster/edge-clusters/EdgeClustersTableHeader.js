import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const EdgeClustersTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Secret</TableCell>
    </TableRow>
  </TableHead>
);

export default EdgeClustersTableHeader;
