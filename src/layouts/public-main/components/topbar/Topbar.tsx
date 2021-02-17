import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withTranslation, WithTranslation } from 'react-i18next';

import styles from './Styles';

interface TopbarProps extends WithTranslation {
  className?: string;
  onSignUpClick: () => void;
  onSignInClick: () => void;
}

const Topbar = React.memo<TopbarProps>(({ t, className, onSignUpClick, onSignInClick }) => {
  const classes = styles();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <div className={classes.flexGrow} />
        <Button color="inherit" onClick={onSignUpClick}>
          {t('signUp.title')}
        </Button>
        <Button color="inherit" onClick={onSignInClick}>
          {t('signIn.button')}
        </Button>
      </Toolbar>
    </AppBar>
  );
});

export default withTranslation()(Topbar);
