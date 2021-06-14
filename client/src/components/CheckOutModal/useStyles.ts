import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
  checkoutContainer: {
    backgroundColor: 'white',
    display: 'flex',
    width: '50%',
    height: '35%',
    margin: '125px auto',
    flexDirection: 'column',
  },
  contestFormLabel: {
    fontSize: 16,
    fontWeight: 700,
    padding: '20px',
  },
  spanLabel: {
    fontSize: '12px',
    position: 'relative',
    bottom: '20px',
    left: '20px',
  },
  submit: {
    width: 200,
    height: 56,
    borderRadius: 0,
    margin: 20,
    fontSize: 16,
    backgroundColor: 'black',
    fontWeight: 'bold',
    '&:hover': { color: 'black', backgroundColor: 'white' },
  },
  formContainer: {
    textAlign: 'center',
  },
  cardContainer: {
    height: '15%',
    alignSelf: 'center',
    width: '50%',
  },
}));

export default useStyles;
