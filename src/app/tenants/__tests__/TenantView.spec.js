import React from 'react';
import renderer from 'react-test-renderer';

import TenantView from '../TenantView';

const tenant = {
  id: 'tenantID',
  name: 'Tenant Name',
};

it('renders correctly', () => {
  const tree = renderer.create(<TenantView tenant={tenant} />).toJSON();

  expect(tree).toMatchSnapshot();
});
