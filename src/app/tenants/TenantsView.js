import React from 'react';

import TenantView from './TenantView';

const TenantsView = ({ tenants }) => tenants.map(tenant => <TenantView tenant={tenant} />);

export default TenantsView;
