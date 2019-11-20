import React from 'react';
import renderer from 'react-test-renderer';

import TenantView from '../TenantView';

describe('<TenantView />', () => {
  const tenant = {
    id: 'tenantID',
    name: 'Tenant Name',
  };

  const props = {
    onTenantClick: jest.fn(),
  };

  it('renders correctly', () => {
    const tree = renderer.create(<TenantView tenant={tenant} {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
