import React, { Fragment } from 'react';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';

import { TopbarContainer } from './components';
import FooterContainer from '../footer';
import styles from './Styles';

interface MainContainerProps {
  children: React.ComponentType<any>;
}

interface Theme {
  breakpoints: Breakpoints;
}

const PublicMainContainer = React.memo<MainContainerProps>(({ children }) => {
  const classes = styles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx({ [classes.root]: true, [classes.shiftContent]: isDesktop })}>
      <Fragment>
        <TopbarContainer />
        <main className={classes.content}>{children}</main>
      </Fragment>
      <FooterContainer />
    </div>
  );
});

export default PublicMainContainer;
