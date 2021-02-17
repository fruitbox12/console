import React, { MouseEvent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { PopoverProps } from '@material-ui/core/Popover';

import styles from './Styles';

interface TopbarProps extends WithTranslation {
  className?: string;
  onSidebarOpen: () => void;
  onProfileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  onMobileMenuClose: () => void;
  onMenuClose: () => void;
  onMobileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  mobileMoreAnchorEl?: PopoverProps['anchorEl'];
  isMobileMenuOpen: boolean;
  isMenuOpen: boolean;
  anchorEl?: PopoverProps['anchorEl'];
  onProfileClick: () => void;
  onSignOutClick: () => void;
}

const Topbar = React.memo<TopbarProps>(
  ({
    t,
    className,
    onSidebarOpen,
    onProfileMenuOpen,
    onMobileMenuClose,
    onMenuClose,
    onMobileMenuOpen,
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    isMenuOpen,
    anchorEl,
    onProfileClick,
    onSignOutClick,
  }) => {
    const classes = styles();

    const menuId = 'primary-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onProfileClick}>{t('profile.label')}</MenuItem>
        <MenuItem onClick={onSignOutClick}>{t('signOut.label')}</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={onMobileMenuClose}
      >
        <MenuItem onClick={onProfileMenuOpen}>
          <IconButton aria-label={t('profile.label')} aria-controls={menuId} aria-haspopup="true" color="inherit">
            <AccountCircle />
          </IconButton>
          {t('profile.label')}
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar className={clsx(classes.appBar, className)}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label={t('profile.label')}
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={onProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label={t('showMore.label')}
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={onMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  },
);

export default withTranslation()(Topbar);
