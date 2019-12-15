import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import DomainIcon from '@material-ui/icons/Domain';
import GridOnIcon from '@material-ui/icons/GridOn';
import SettingsIcon from '@material-ui/icons/Settings';
import InputIcon from '@material-ui/icons/Input';

import { Profile, SidebarNav } from './components';
import styles from './Styles';

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = styles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />,
    },
    {
      title: 'Tenants',
      href: '/tenants',
      icon: <DomainIcon />,
    },
    {
      title: 'Edge Clusters',
      href: '/edge-clusters',
      icon: <GridOnIcon />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
    },
    {
      title: 'Sign Out',
      href: '/sign-out',
      icon: <InputIcon />,
    },
  ];

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
