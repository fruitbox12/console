import React from 'react';

import { userTenants } from './PropTypes';
import TenantsView from './TenantsView';

const TenantsContainer = ({ user }) => <TenantsView tenants={user.tenants.edges.map(_ => _.node)} />;

TenantsContainer.propTypes = {
  user: userTenants.isRequired,
};

export default TenantsContainer;
