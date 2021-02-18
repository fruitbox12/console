import makeStyles from '@material-ui/styles/makeStyles';

const styles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

export default styles;
