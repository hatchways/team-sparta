import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 0,
    minWidth: '100vw',
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Poppins'",
  },
  logInBox: {
    borderRadius: '5px',
  },
}));

export default useStyles;
