import React from 'react';
import renderer from 'react-test-renderer';

import TenantsTableHeader from '../TenantsTableHeader';

describe('<TenantView />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TenantsTableHeader />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
