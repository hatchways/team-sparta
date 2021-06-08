import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  ListContainer: {
    height: '50vh',
    overflow: 'auto',
  },
  link: {
    textDecoration: 'none',
    focus: { outline: 0 },
  },
  img: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: '2rem 2rem',
  },
  Name: {
    colorTextPrimary: 'black',
    fontWeight: 'bold',
  },
  ListItems: {
    height: '100%',
    marginLeft: '2rem',
  },
  priceContainer: {
    width: 'fit-content',
    height: 'auto',
    marginTop: '2rem',
  },
  price: {
    background: 'black',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
  },
}));

export default useStyles;
