import makeStyles from '@material-ui/styles/makeStyles';

const drawerWidth = 240;

const styles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  flexGrow: {
    flexGrow: 1,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  selectProjectButton: {
    margin: theme.spacing(1),
  },
}));

export default styles;
