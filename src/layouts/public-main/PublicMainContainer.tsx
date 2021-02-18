import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import styles from './Styles';
import TopbarContainer from './components/topbar';
import FooterContainer from '../footer';

interface MainContainerProps {
  children: React.ComponentType<any>;
}

const PublicMainContainer = React.memo<MainContainerProps>(({ children }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopbarContainer />
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

export default PublicMainContainer;
