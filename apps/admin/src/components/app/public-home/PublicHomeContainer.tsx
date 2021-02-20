import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import styles from './Styles';

export default React.memo(() => {
  const classes = styles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>Public Home</div>
    </Container>
  );
});
