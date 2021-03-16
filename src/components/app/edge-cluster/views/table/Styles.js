import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  link: {
    margin: theme.spacing(1),
  },
  row: {
    height: 40,
  },
  nameAndEditCell: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default styles;
