import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import styles from './Styles';

interface GenericErrorContainerProps {
  message: string;
}

export default React.memo<GenericErrorContainerProps>(({ message }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="h5" gutterBottom>
          Error: {message}
        </Typography>
      </Container>
    </div>
  );
});
