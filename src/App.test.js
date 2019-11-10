import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const window = global;
window._env_ = {
  API_GATEWAY_PUBLIC_URL: '/graphql',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
