import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

import styles from './Styles';

const Topbar = ({ t, className, onSignUpClick, onSignInClick }) => {
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
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSignUpClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

export default withTranslation()(Topbar);
