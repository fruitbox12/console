const dev = {
  'api-gateway': {
    URL:
      process.env.REACT_APP_API_GATEWAY_URL === undefined || process.env.REACT_APP_API_GATEWAY_URL === ''
        ? '/graphql'
        : process.env.REACT_APP_API_GATEWAY_URL,
  },
};

const prod = {
  'api-gateway': {
    URL: process.env.REACT_APP_API_GATEWAY_URL,
  },
};

export default process.env.REACT_APP_STAGE === 'production' ? prod : dev;
