import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    flexWrap: 'unset',
  },
  drawerWrapper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    height: 'fit-content',
  },
  chatTitle: {
    fontWeight: 700,
    fontSize: 20,
    margin: '1rem 0',
  },
  routeContainer: {
    height: '100%',
    overflowY: 'scroll',
  },
}));

export default useStyles;
