import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import styles from './Styles';

const Topbar = props => {
  const { className, onSignInClick, ...rest } = props;
  const classes = styles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo-white.png" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Button color="inherit" onClick={onSignInClick}>
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSignInClick: PropTypes.func.isRequired,
};

export default Topbar;
