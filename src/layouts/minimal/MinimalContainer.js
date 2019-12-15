import React from 'react';
import PropTypes from 'prop-types';

import { Topbar } from './components';
import styles from './Styles';

const MinimalContainer = props => {
  const { children } = props;
  const classes = styles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

MinimalContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MinimalContainer;
