import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation CreateTenantMutation($input: CreateTenantInput!) {
    createTenant(input: $input) {
      clientMutationId
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_tenants');

  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

const commit = (environment, { name }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('createTenant');
      const newEdge = payload.getLinkedRecord('tenant');

      if (!newEdge) {
        return;
      }

      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a Tenant record in our store with a temporary ID
      const id = 'client:newTenant:' + cuid();
      const node = store.create(id, 'Tenant');

      node.setValue(id, 'id');
      node.setValue(name, 'name');

      // Create a new edge that contains the newly created Tenant record
      const newEdge = store.create('client:newEdge:' + cuid(), 'Tenant');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's tenant list
      sharedUpdater(store, user, newEdge);
    },
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.createTenant.tenant ? response.createTenant.tenant.node : null);
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
