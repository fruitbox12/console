import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SidebarNavContainer from './components/sidebar-nav';
import styles from './Styles';
import { Page } from './components/sidebar-nav/SidebarNavContainer';

interface SidebarContainerProps extends WithTranslation {
  onDrawerClose: () => void;
  open: boolean;
}

const SidebarContainer = React.memo<SidebarContainerProps & RouteComponentProps>(({ t, history, onDrawerClose, open }) => {
  const classes = styles();
  const theme = useTheme();

  const pages: Page[] = [
    {
      key: 'dashboard',
      title: t('dashboard.label'),
      icon: <HomeIcon />,
      onClick: () => history.push('/dashboard'),
    },
    {
      key: 'project',
      title: t('project.label'),
      icon: <DashboardIcon />,
      onClick: () => history.push('/project'),
    },
    {
      key: 'edge-cluster',
      title: t('edgeCluster.label'),
      icon: <BlurOnIcon />,
      onClick: () => history.push('/edgecluster'),
    },
  ];

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
});

export default withRouter(withTranslation()(SidebarContainer));
