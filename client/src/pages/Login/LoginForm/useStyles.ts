import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: 10,
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 0,
    color: 'black',
    textDecoration: 'underline',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 0,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: 'black',
    fontWeight: 'bold',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    '&:hover': { color: 'black', backgroundColor: 'white' },
  },
}));

export default useStyles;
