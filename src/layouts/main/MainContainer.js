import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { useReactOidc } from '@axa-fr/react-oidc-context';

import { Sidebar, Topbar, Footer } from './components';
import styles from './Styles';

const MainContainer = props => {
  const { children } = props;
  const classes = styles();
  const theme = useTheme();
  const { logout } = useReactOidc();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} onSignOutClick={logout} />
      <Sidebar onClose={handleSidebarClose} open={shouldOpenSidebar} variant={isDesktop ? 'persistent' : 'temporary'} />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node,
};

export default MainContainer;
