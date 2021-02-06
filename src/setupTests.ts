// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import './globalConfig';

const window = global;

window._env_ = {
  API_GATEWAY_PUBLIC_URL: '/graphql',
  AUTH0_DOMAIN: 'dev-g4pa4kih.eu.auth0.com',
  AUTH0_CLIENT: 'OqD429Y6GpuSNo6gRSipdFOwbx68HkcZ',
};

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});
global.crypto.subtle = {}; // this gets around the 'auth0-spa-js must run on a secure origin' error
