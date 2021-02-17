import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Topbar from './Topbar';

const TopbarContainer = React.memo(() => {
  const { loginWithRedirect } = useAuth0();

  const signUp = () => {
    loginWithRedirect({
      screen_hint: 'signup',
    });
  };

  const signIn = () => {
    loginWithRedirect({
      screen_hint: 'signin',
    });
  };

  return <Topbar onSignUpClick={signUp} onSignInClick={signIn} />;
});

export default TopbarContainer;
