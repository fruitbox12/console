import React from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const SignOutContainer = () => {
  const { logout } = useReactOidc();

  logout();

  return <div></div>;
};

export default SignOutContainer;
