import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateProjectMutation($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      clientMutationId
      project {
        node {
          id
          name
        }
      }
    }
  }
`;

const getOptimisticResponse = (id, { name }, user) => {
  if (!user) {
    return {};
  }

  return {
    updateProject: {
      user: {
        id: user.id,
        project: {
          node: {
            id,
            name,
          },
        },
      },
    },
  };
};

const commit = (environment, { projectID, name }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        projectID,
        name,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(projectID, { name }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateProject.project ? response.updateProject.project.node : null);
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
