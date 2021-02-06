import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Styles from './Styles';

export default React.memo(() => {
  const classes = Styles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
});
