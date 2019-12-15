const getConfiguration = () => ({
  authority: window._env_.ODIC_AUTHORITY,
  client_id: window._env_.ODIC_CLIENT_ID,
  redirect_uri: document.location.origin + '/tenants',
  silent_redirect_uri: document.location.origin + '/tenants',
  post_logout_redirect_uri: document.location.origin + '/sign-in',
  response_type: 'id_token token',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true,
});

export default getConfiguration;
