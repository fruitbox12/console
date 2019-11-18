import PropTypes from 'prop-types';

export const tenantProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const tenantsProp = PropTypes.arrayOf(tenantProp);

export const tenantEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: tenantProp.isRequired,
});

export const tenantEdgesProp = PropTypes.arrayOf(tenantEdgeProp);

export const relayTenants = PropTypes.shape({
  edges: tenantEdgesProp.isRequired,
});

export const userTenants = PropTypes.shape({
  id: PropTypes.string.isRequired,
  tenants: relayTenants.isRequired,
});
