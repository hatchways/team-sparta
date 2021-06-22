import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    flex: 1,
  },
  tabContainer: {
    width: '25%',
    height: '100vh',
    display: 'flex',
  },
  tabDisplay: {
    height: '60%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: '50px',
  },
  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'end',
      fontSize: '16px',
      padding: '20px',
      color: 'grey',
    },
    '& .PrivateTabIndicator-colorSecondary-210': {
      backgroundColor: 'white',
    },
    '& .PrivateTabIndicator-colorSecondary-207': {
      backgroundColor: 'white',
    },
    '& .PrivateTabIndicator-colorSecondary-208': {
      backgroundColor: 'white',
    },
  },
}));

export default useStyles;
