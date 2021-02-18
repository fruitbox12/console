import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Styles';

export default React.memo(() => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
});
