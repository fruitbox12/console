import React from 'react';

import TenantView from './TenantView';

const TenantsView = ({ tenants }) => tenants.map(tenant => <TenantView key={tenant.id} tenant={tenant} />);

export default TenantsView;
