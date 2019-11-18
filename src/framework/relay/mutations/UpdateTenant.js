import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import cuid from 'cuid';

const mutation = graphql`
  mutation UpdateTenantMutation($input: UpdateTenantInput!) {
    updateTenant(input: $input) {
      tenant {
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
    updateTenant: {
      user: {
        id: user.id,
        tenant: {
          node: {
            id,
            name,
          },
        },
      },
    },
  };
};

const commit = (environment, { tenantID, name }, user, { onSuccess, onError } = {}) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        tenantID,
        name,
        clientMutationId: cuid(),
      },
    },
    optimisticResponse: getOptimisticResponse(tenantID, { name }, user),
    onCompleted: (response, errors) => {
      if (errors && errors.length > 0) {
        return;
      }

      if (!onSuccess) {
        return;
      }

      onSuccess(response.updateTenant.tenant.node);
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
