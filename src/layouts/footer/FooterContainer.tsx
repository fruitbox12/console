import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import styles from './Styles';
import Copyright from './Copyright';

export default React.memo(() => {
  const classes = styles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary">
          Edge Cloud: {window._env_.VERSION}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
});
