import React from 'react';
import renderer from 'react-test-renderer';

import TenantsView from '../TenantsView';

describe('<TenantsView />', () => {
  const props = {
    onCreateTenantClick: jest.fn(),
  };

  const tenants = [
    {
      id: 'tenantID1',
      name: 'Tenant Name1',
    },
    {
      id: 'tenantID2',
      name: 'Tenant Name2',
    },
    {
      id: 'tenantID3',
      name: 'Tenant Name3',
    },
  ];

  it('renders correctly', () => {
    const tree = renderer.create(<TenantsView tenants={tenants} {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
