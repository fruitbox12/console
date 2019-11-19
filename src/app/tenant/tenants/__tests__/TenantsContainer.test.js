import React from 'react';
import { mount } from 'enzyme';
import cuid from 'cuid';
import { Range } from 'immutable';
import Chance from 'chance';

import { TenantsContainer } from '../TenantsContainer';
import TenantsView from '../TenantsView';

const chance = new Chance();

describe('<TenantsContainer />', () => {
  const tenants = Range(
    1,
    chance.integer({
      min: 1,
      max: 20,
    }),
  )
    .map(() => ({ id: cuid(), name: cuid() }))
    .toArray();
  const user = {
    id: cuid(),
    tenants: {
      edges: tenants.map(({ id, name }) => ({ node: { id, name }, cursor: cuid() })),
    },
  };

  it('renders <TenantsView /> component using correct tenants', () => {
    const wrapper = mount(<TenantsContainer user={user} />);
    const tenantsView = wrapper.find(TenantsView);

    expect(tenantsView).toBeTruthy();
    expect(tenantsView.props().tenants).toEqual(tenants);
  });
});
