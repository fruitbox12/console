import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import cuid from 'cuid';

const mutation = graphql`
  mutation DeleteProjectMutation($input: DeleteProjectInput!) {
    deleteProject(input: $input) {
      deletedProjectID
    }
  }
`;

const sharedUpdater = (store, user, projectID) => {
  if (!user) {
    return;
  }

  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_projects');

  ConnectionHandler.deleteNode(connection, projectID);
};

const commit = (environment, { projectID }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        projectID,
        clientMutationId: cuid(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('deleteProject');
      const deletedProjectID = payload.getValue('deletedProjectID');

      sharedUpdater(store, user, deletedProjectID);
    },
    optimisticUpdater: (store) => {
      sharedUpdater(store, user, projectID);
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
