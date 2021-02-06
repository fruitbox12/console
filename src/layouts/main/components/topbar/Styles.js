import makeStyles from '@material-ui/styles/makeStyles';

const styles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default styles;
