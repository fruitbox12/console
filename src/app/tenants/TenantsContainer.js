import React from 'react';

import TenantsView from './TenantsView';

const TenantsContainer = ({ user }) => <TenantsView tenants={user.tenants.edges.map(_ => _.node)} />;

export default TenantsContainer;
