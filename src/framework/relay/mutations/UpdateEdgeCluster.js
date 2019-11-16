import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateEdgeClusterMutation($input: UpdateEdgeClusterInput!) {
    updateEdgeCluster(input: $input) {
      edgeCluster {
        __typename
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

const getOptimisticResponse = (id, { name }, user) => {
  return {
    updateEdgeCluster: {
      user: {
        id: user.id,
        edgeCluster: {
          node: {
            id,
            name,
          },
        },
      },
    },
  };
};

const commit = (environment, { edgeClusterID, tenantID, name, k3SClusterSecret }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        edgeClusterID,
        tenantID,
        name,
        k3SClusterSecret,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(edgeClusterID, { name }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateEdgeCluster.edgeCluster.node);
    },
    onError: ({ message: errorMessage }) => {
      if (!onError) {
        return;
      }

      onError(errorMessage);
    },
  });
};

export default commit;
