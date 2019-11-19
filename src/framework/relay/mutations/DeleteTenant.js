import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation DeleteTenantMutation($input: DeleteTenantInput!) {
    deleteTenant(input: $input) {
      deletedTenantID
    }
  }
`;

const sharedUpdater = (store, user, tenantID) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_tenants');

  ConnectionHandler.deleteNode(connection, tenantID);
};

const commit = (environment, { tenantID }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        tenantID,
        clientMutationId: cuid(),
      },
    },
    updater: store => {
      const payload = store.getRootField('deleteTenant');
      const deletedTenantID = payload.getValue('deletedTenantID');

      sharedUpdater(store, user, deletedTenantID);
    },
    optimisticUpdater: store => {
      sharedUpdater(store, user, tenantID);
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
