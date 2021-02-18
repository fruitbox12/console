import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Topbar from './Topbar';

interface TopbarContainerProps {
  open: boolean;
  onDrawerOpen: () => void;
}

const TopbarContainer = React.memo<TopbarContainerProps>(({ open, onDrawerOpen }) => {
  const { user } = useAuth0();
  const { picture } = user;

  return <Topbar drawerOpen={open} onDrawerOpen={onDrawerOpen} pictureUrl={picture} />;
});

export default TopbarContainer;
