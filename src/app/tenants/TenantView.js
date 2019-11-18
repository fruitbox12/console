import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { tenantProp } from './PropTypes';
import Styles from './Styles';

const TenantView = ({ tenant: { name } }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link}>{name}</Link>
      </TableCell>
    </TableRow>
  );
};

TenantView.propTypes = {
  tenant: tenantProp.isRequired,
};

export default TenantView;
