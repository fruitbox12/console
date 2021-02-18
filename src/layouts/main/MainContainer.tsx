import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import SidebarContainer from './components/sidebar';
import TopbarContainer from './components/topbar';
import FooterContainer from '../footer';
import styles from './Styles';

interface MainContainerProps {
  children: React.ComponentType<any>;
}

const MainContainer = React.memo<MainContainerProps>(({ children }) => {
  const classes = styles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopbarContainer open={open} onDrawerOpen={handleDrawerOpen} />
      <SidebarContainer open={open} onDrawerClose={handleDrawerClose} />
      <Container>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </Container>
      <footer className={classes.footer}>
        <FooterContainer />
      </footer>
    </div>
  );
});

export default MainContainer;
