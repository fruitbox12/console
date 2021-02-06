import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';

import { TopbarContainer } from './components';
import FooterContainer from '../footer';
import styles from './Styles';

const PublicMainContainer = ({ children }) => {
  const classes = styles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx({ [classes.root]: true, [classes.shiftContent]: isDesktop })}>
      <div>
        <TopbarContainer />
        <main className={classes.content}>{children}</main>
      </div>
      <FooterContainer />
    </div>
  );
};

PublicMainContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PublicMainContainer;
