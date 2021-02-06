import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateEdgeClusterMutation($input: UpdateEdgeClusterInput!) {
    updateEdgeCluster(input: $input) {
      clientMutationId
    }
  }
`;

const getOptimisticResponse = (id, { tenantID, name, clusterType, clusterSecret }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateEdgeCluster: {
      user: {
        id: user.id,
        edgeCluster: {
          node: {
            id,
            tenantID,
            name,
            clusterType,
            clusterSecret,
          },
        },
      },
    },
  };
};

const commit = (environment, { edgeClusterID, tenantID, name, clusterType, clusterSecret }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        edgeClusterID,
        tenantID,
        name,
        clusterType,
        clusterSecret,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(edgeClusterID, { tenantID, name, clusterType, clusterSecret }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateEdgeCluster.edgeCluster ? response.updateEdgeCluster.edgeCluster.node : null);
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
