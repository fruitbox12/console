import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import styles from './Styles';
import SidebarNavContainer from './components/sidebar-nav';
import { Page } from './components/sidebar-nav/SidebarNavContainer';

interface SidebarContainerProps extends WithTranslation {
  onDrawerClose: () => void;
  open: boolean;
}

const SidebarContainer = React.memo<
  SidebarContainerProps &
    RouteComponentProps<{
      projectID?: string;
    }>
>(
  ({
    t,
    history,
    onDrawerClose,
    open,
    match: {
      params: { projectID },
    },
  }) => {
    const classes = styles();
    const theme = useTheme();

    let pages: Page[] = [];

    if (projectID) {
      pages.push({
        key: 'dashboard',
        title: t('dashboard.label'),
        icon: <HomeIcon />,
        onClick: () => history.push(`/${projectID}/dashboard`),
      });

      pages.push({
        key: 'edge-cluster',
        title: t('edgeCluster.label'),
        icon: <BlurOnIcon />,
        onClick: () => history.push(`/${projectID}/edgecluster`),
      });
    } else {
      pages.push({
        key: 'dashboard',
        title: t('dashboard.label'),
        icon: <HomeIcon />,
        onClick: () => history.push(`/dashboard`),
      });
    }

    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </div>
        <SidebarNavContainer pages={pages} />
        <Divider />
      </Drawer>
    );
  },
);

export default withRouter(withTranslation()(SidebarContainer));
