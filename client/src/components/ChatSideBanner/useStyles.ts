import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatSideBanner: {
    display: 'flex',
    padding: '1rem 1rem',
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      padding: '2rem 2rem',
      width: '300px',
    },
  },
  toolBar: {
    backgroundColor: 'black',
    color: 'white',
  },
  account: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: 'white',
  },
  navLinks: {
    Button: {
      width: 170,
      height: 54,
      filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
      backgroundColor: '#000000',
      color: '#f4f4f4',
      boxShadow: 'none',
      marginRight: 35,
      display: 'flex',
      alignItems: 'right',
      '&:hover': { color: 'grey' },
    },
  },
  link: { textDecoration: 'none' },
  userText: {
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: 16,
  },
  title: {
    flexGrow: 1,
    display: 'inline',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    h4: {
      letterSpacing: '6px',
    },
  },
}));

export default useStyles;
