import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { tenantProp } from './PropTypes';

const TenantView = ({ tenant: { name } }) => (
  <TableRow>
    <TableCell padding="checkbox">
      <Checkbox checked={false} />
    </TableCell>
    <TableCell component="th" scope="row" padding="none">
      {name}
    </TableCell>
  </TableRow>
);

TenantView.propTypes = {
  tenant: tenantProp.isRequired,
};

export default TenantView;
