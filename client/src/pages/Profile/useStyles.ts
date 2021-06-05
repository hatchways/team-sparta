import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  ProfileContent: {
    width: '100%',
    height: '100%',
  },
  UserImage: {
    marginTop: '4rem',
    width: theme.spacing(15),
    height: 'auto',
    marginBottom: '1rem',
  },
  UserName: {
    fontSize: 26,
  },
  TabContainer: {
    width: '80%',
    marginTop: '2rem',
  },
  TabBar: {
    backgroundColor: 'transparent',
    border: 0,
    elevation: 0,
  },
  Tabs: {
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
  Tab: {
    backgroundColor: 'transparent',
  },
  link: {
    textDecoration: 'none',
    focus: { outline: 0 },
  },
  Button: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: 'black',
    elevation: 0,
    border: '1px solid gray',
    margin: '2rem 2rem',
  },
}));

export default useStyles;
