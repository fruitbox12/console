import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withTranslation, WithTranslation } from 'react-i18next';

import styles from './Styles';

export default withTranslation()(
  React.memo<WithTranslation>(({ t }) => {
    const classes = styles();
    const { user, logout } = useAuth0();
    // @ts-ignore: Object is possibly 'undefined'.
    const { name, email, picture } = user;

    const signOut = () => {
      logout();
    };

    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Person" className={classes.avatar} src={picture} />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={email} />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <Button onClick={signOut} color="primary">
          {t('signOut.button')}
        </Button>
      </List>
    );
  }),
);
