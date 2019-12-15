const getConfiguration = () => ({
  authority: window._env_.ODIC_AUTHORITY,
  client_id: window._env_.ODIC_CLIENT_ID,
  redirect_uri: document.location.origin + '/',
  response_type: 'id_token token',
  scope: 'openid profile email',
  silent_redirect_uri: document.location.origin + '/',
  post_logout_redirect_uri: document.location.origin + '/',
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true,
});

export default getConfiguration;
