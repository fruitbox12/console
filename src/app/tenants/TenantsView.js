import React from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import { tenantsProp } from './PropTypes';
import Styles from './Styles';
import TenantsTableHeader from './TenantsTableHeader';
import TenantsTableBody from './TenantsTableBody';

const TenantsView = ({ tenants }) => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <TenantsTableHeader />
            <TenantsTableBody tenants={tenants} />
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
