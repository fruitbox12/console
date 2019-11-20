import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import EdgeClustersContainer from './EdgeClustersContainer';

export default createFragmentContainer(EdgeClustersContainer, {
  user: graphql`
    fragment EdgeClustersRelayContainer_user on User {
      id
      edgeClusters(first: 1000, tenantIDs: $tenantIDs) @connection(key: "User_edgeClusters") {
        edges {
          node {
            id
            name
            clusterSecret
          }
        }
      }
    }
  `,
});
