import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default React.memo(() => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href={window.location.host}>
        Micro Business
      </Link>
      {' ' + new Date().getFullYear() + '.'}
    </Typography>
  );
});
