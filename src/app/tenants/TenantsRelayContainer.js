import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TenantsContainer from './TenantsContainer';

export default createFragmentContainer(TenantsContainer, {
  user: graphql`
    fragment TenantsRelayContainer_user on User {
      id
      tenants(first: 1000) @connection(key: "User_tenants") {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
});
