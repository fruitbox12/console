import makeStyles from '@material-ui/styles/makeStyles';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

export default styles;
