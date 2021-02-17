import React from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

import { ProfileContainer, SidebarNavContainer } from './components';
import styles from './Styles';
import { Page } from './components/sidebar-nav/SidebarNavContainer';

interface SidebarContainerProps extends WithTranslation {
  onClose: () => void;
  className?: string;
  shouldOpenSidebar: boolean;
  variant?: 'persistent' | 'temporary';
}

const SidebarContainer = React.memo<SidebarContainerProps & RouteComponentProps>(({ t, history, onClose, className, shouldOpenSidebar, ...rest }) => {
  const classes = styles();

  const pages: Page[] = [
    {
      key: 'dashboard',
      title: t('dashboard.label'),
      icon: <DashboardIcon />,
      onClick: () => history.push('/dashboard'),
    },
    {
      key: 'project-management',
      title: t('projectManagement.label'),
      icon: <DashboardIcon />,
      onClick: () => history.push('/project'),
    },
    {
      key: 'edge-cluster-management',
      title: t('edgeClusterManagement.label'),
      icon: <DashboardIcon />,
      onClick: () => history.push('/edgecluster'),
    },
  ];

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={shouldOpenSidebar} {...rest}>
      <div className={clsx(classes.root, className)}>
        <ProfileContainer />
        <Divider className={classes.divider} />
        <SidebarNavContainer className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
});

export default withRouter(withTranslation()(SidebarContainer));
