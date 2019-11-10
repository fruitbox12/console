import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import Config from '../config';

const fetchQuery = async (operation, variables) => {
  const response = await fetch(Config['api-gateway'].URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors.map(error => error.message).reduce((reduction, message) => `${reduction}\n${message}`));
  }

  return result;
};

// Create a network layer from the fetch function
const relayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default relayEnvironment;
