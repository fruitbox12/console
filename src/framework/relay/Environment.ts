import { Environment, Network, RecordSource, Store, RequestParameters, Variables } from 'relay-runtime';

import '../../globalConfig';

const fetchQuery = async (request: RequestParameters, variables: Variables) => {
  const auth0 = Object.entries(localStorage).find((key) => key[0].includes('auth0'));

  if (!auth0) {
    throw new Error('Not authenticated');
  }

  const auth0Context = JSON.parse(auth0[1]);

  if (!auth0Context || !auth0Context.body || !auth0Context.body.id_token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(window._env_.API_GATEWAY_PUBLIC_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth0Context.body.id_token}`,
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors.map((error: Error) => error.message).reduce((reduction: string, message: string) => `${reduction}\n${message}`));
  }

  return result;
};

// Create a network layer from the fetch function
const relayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default relayEnvironment;
