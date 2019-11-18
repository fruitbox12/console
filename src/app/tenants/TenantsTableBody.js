import React from 'react';
import TableBody from '@material-ui/core/TableBody';

import { tenantsProp } from './PropTypes';
import TenantView from './TenantView';

const TenantsTableBody = ({ tenants }) => (
  <TableBody>
    {tenants.map(tenant => (
      <TenantView key={tenant.id} tenant={tenant} />
    ))}
  </TableBody>
);

TenantsTableBody.propTypes = {
  tenants: tenantsProp.isRequired,
};

export default TenantsTableBody;
