import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import styles from './Styles';

interface ProfileContainerProps {
  className?: string;
}

export default React.memo<ProfileContainerProps>(({ className }) => {
  const classes = styles();
  const { user } = useAuth0();
  const { name, email, picture } = user;

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} src={picture} />
      <Typography className={classes.name} variant="h4">
        {name}
      </Typography>
      <Typography variant="body2">{email}</Typography>
    </div>
  );
});
