import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withTranslation, WithTranslation } from 'react-i18next';

import styles from './Styles';

interface TopbarProps extends WithTranslation {
  onSignInClick: () => void;
}

const Topbar = React.memo<TopbarProps>(({ t, onSignInClick }) => {
  const classes = styles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {t('edgeCloud.title')}
        </Typography>
        <div className={classes.flexGrow} />
        <Button color="inherit" onClick={onSignInClick}>
          {t('signIn.button')}
        </Button>
      </Toolbar>
    </AppBar>
  );
});

export default withTranslation()(Topbar);
