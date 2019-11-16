import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation DeleteEdgeClusterMutation($input: DeleteEdgeClusterInput!) {
    deleteEdgeCluster(input: $input) {
      deletedEdgeClusterID
    }
  }
`;

const sharedUpdater = (store, user, edgeClusterID) => {
  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_edgeClusters');

  ConnectionHandler.deleteNode(connection, edgeClusterID);
};

const commit = (environment, { edgeClusterID }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        edgeClusterID,
        clientMutationId: cuid(),
      },
    },
    updater: store => {
      const payload = store.getRootField('deleteEdgeCluster');
      const deletedEdgeClusterID = payload.getValue('deletedEdgeClusterID');

      sharedUpdater(store, user, deletedEdgeClusterID);
    },
    optimisticUpdater: store => {
      sharedUpdater(store, user, edgeClusterID);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess();
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
