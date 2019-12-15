import React from 'react';
import PropTypes from 'prop-types';
import { useReactOidc } from '@axa-fr/react-oidc-context';

import { Topbar } from './components';
import styles from './Styles';

const PublicMinimalContainer = props => {
  const { children } = props;
  const classes = styles();
  const { login } = useReactOidc();

  return (
    <div className={classes.root}>
      <Topbar onSignInClick={login} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

PublicMinimalContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PublicMinimalContainer;
