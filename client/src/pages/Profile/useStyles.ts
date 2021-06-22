import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  profileContent: {
    width: '100%',
    height: '100vh',
  },
  userImage: {
    marginTop: '4rem',
    width: theme.spacing(15),
    height: 'auto',
    marginBottom: '1rem',
  },
  userName: {
    fontSize: 26,
  },
  tabContainer: {
    width: '80%',
    marginTop: '2rem',
  },
  tabBar: {
    backgroundColor: 'transparent',
    border: 0,
    elevation: 0,
  },
  tabs: {
    color: 'black',
    textColorPrimary: 'black',
    backgroundColor: 'transparent',
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      textColor: 'black',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: 'black',
      },
    },
    primary: {
      main: 'black[500]',
    },
  },
  tab: {
    backgroundColor: 'transparent',
  },
  link: {
    textDecoration: 'none',
    focus: { outline: 0 },
  },
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
  row: {
    width: '475px',
    margin: '30px auto',
    borderRadius: '4px',
    backgroundColor: '#7795f8',
    position: 'relative',
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
  submissionImage: {
    height: '125px',
    padding: '20px',
  },
}));

export default useStyles;
