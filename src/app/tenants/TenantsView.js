import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { tenantsProp } from './PropTypes';
import Styles from './Styles';
import TenantsTableHeader from './TenantsTableHeader';
import TenantView from './TenantView';

const TenantsView = ({ tenants }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <TenantsTableHeader />
            <TableBody>
              {tenants.map(tenant => (
                <TenantView key={tenant.id} tenant={tenant} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

TenantsView.propTypes = {
  tenants: tenantsProp.isRequired,
};

export default TenantsView;
