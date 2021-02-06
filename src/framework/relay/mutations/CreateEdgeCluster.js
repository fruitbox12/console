import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateEdgeClusterMutation($input: CreateEdgeClusterInput!) {
    createEdgeCluster(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_edgeClusters');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (environment, { tenantID, name, clusterType, clusterSecret }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        tenantID,
        name,
        clusterType,
        clusterSecret,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createEdgeCluster');
      const newEdge = payload.getLinkedRecord('edgeCluster');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a EdgeCluster record in our store with a temporary ID
      const id = 'client:newEdgeCluster:' + cuid();
      const node = store.create(id, 'EdgeCluster');

      node.setValue(id, 'id');
      node.setValue(name, 'name');
      node.setValue(clusterType, 'clusterType');
      node.setValue(clusterSecret, 'clusterSecret');

      // Create a new edge that contains the newly created EdgeCluster record
      const newEdge = store.create('client:newEdge:' + cuid(), 'EdgeCluster');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's edgeCluster list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createEdgeCluster.edgeCluster ? response.createEdgeCluster.edgeCluster.node : null);
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
