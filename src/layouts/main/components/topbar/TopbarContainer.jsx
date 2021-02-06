import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import Topbar from './Topbar';

const TopbarContainer = ({ className, onSidebarOpen }) => {
  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
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
};

TopbarContainer.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

export default TopbarContainer;
