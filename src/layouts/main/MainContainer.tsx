import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';

import { SidebarContainer, TopbarContainer } from './components';
import FooterContainer from '../footer';
import styles from './Styles';

interface MainContainerProps {
  children: React.ComponentType<any>;
}

interface Theme {
  breakpoints: Breakpoints;
}

const MainContainer = React.memo<MainContainerProps>(({ children }) => {
  const classes = styles();
  const theme = useTheme<Theme>();
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

  const shouldOpenSidebar: boolean = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Fragment>
        <TopbarContainer onSidebarOpen={handleSidebarOpen} />
        <SidebarContainer onClose={handleSidebarClose} shouldOpenSidebar={shouldOpenSidebar} variant={isDesktop ? 'persistent' : 'temporary'} />
        <main className={classes.content}>{children}</main>
      </Fragment>
      <FooterContainer />
    </div>
  );
});

export default MainContainer;
