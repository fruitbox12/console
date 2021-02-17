import React, { useState, MouseEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Topbar from './Topbar';

interface TopbarContainerProps {
  className?: string;
  onSidebarOpen: () => void;
}

const TopbarContainer = React.memo<TopbarContainerProps>(({ className, onSidebarOpen }) => {
  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<any | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    handleMenuClose();
  };

  const handleSignOutClick = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Topbar
      className={className}
      onSidebarOpen={onSidebarOpen}
      onProfileMenuOpen={handleProfileMenuOpen}
      onMobileMenuClose={handleMobileMenuClose}
      onMenuClose={handleMenuClose}
      onMobileMenuOpen={handleMobileMenuOpen}
      isMobileMenuOpen={isMobileMenuOpen}
      isMenuOpen={isMenuOpen}
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      anchorEl={anchorEl}
      onProfileClick={handleProfileClick}
      onSignOutClick={handleSignOutClick}
    />
  );
});

export default TopbarContainer;
