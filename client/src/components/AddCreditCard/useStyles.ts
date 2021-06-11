import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: 'black',
    elevation: 0,
    border: '1px solid gray',
    margin: '2rem 2rem',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  billingDetailsContainer: {
    width: '50%',
    height: '100%',
  },
  contestFormLabel: {
    fontSize: 16,
    fontWeight: 700,
  },
  cardElementContainer: {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    flexDirection: 'column',
    margin: '50px',
    '& .StripeElement': {
      width: '100%',
      padding: '15px',
    },
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
  closeButton: {
    alignSelf: 'flex-end',
  },
}));

export default useStyles;
