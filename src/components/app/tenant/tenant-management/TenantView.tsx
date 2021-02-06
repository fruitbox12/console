import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import { TenantView_tenant } from './__generated__/TenantView_tenant.graphql';
import Styles from './Styles';

interface TenantViewProps {
  tenant: TenantView_tenant;
  onTenantClick: (id: string) => void;
}

export const TenantView = React.memo<TenantViewProps>(({ tenant: { id, name }, onTenantClick }) => {
  const classes = Styles();

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={false} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Link className={classes.link} onClick={() => onTenantClick(id)}>
          {name}
        </Link>
      </TableCell>
    </TableRow>
  );
});

export default createFragmentContainer(TenantView, {
  tenant: graphql`
    fragment TenantView_tenant on Tenant {
      id
      name
    }
  `,
});
