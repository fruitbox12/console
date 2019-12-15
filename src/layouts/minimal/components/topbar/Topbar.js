import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';

import styles from './Styles';

const Topbar = props => {
  const { className, ...rest } = props;
  const classes = styles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary" position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo-white.png" />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
