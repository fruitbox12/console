import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import SignInContainer from './SignInContainer';

export default createFragmentContainer(SignInContainer, {
  user: graphql`
    fragment SignInRelayContainer_user on User {
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
