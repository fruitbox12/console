import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Styles from './Styles';

const UserLoadingContainer = () => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default UserLoadingContainer;
