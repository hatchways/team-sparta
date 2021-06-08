import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  outerBox: {
    width: '65%',
    borderRadius: '5px',
  },
  header: {
    textAlign: 'center',
    marginTop: '.5em',
    fontStyle: 'bold',
    fontSize: '35px',
  },
  subHeader: {
    textAlign: 'center',
    marginTop: '2em',
    fontStyle: 'bold',
    fontSize: '20px',
  },
  description: {
    textAlign: 'center',
    marginTop: '1em',
    fontSize: '13.5px',
    color: 'grey',
  },
  descriptionFile: {
    textAlign: 'center',
    marginTop: '.5em',
    marginBottom: '2em',
    paddingBottom: '2em',
    fontSize: '13.5px',
    color: 'grey',
  },
  button: {
    marginTop: '2em',
  },
  uploadIcon: {
    color: 'primary',
    fontSize: '150px',
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

  preview: {
    margin: theme.spacing(2, 1, 1),
    width: 200,
    height: 200,
    boxShadow: '5px 10px 10px #888888',
  },

  deleteIcon: {
    transition: 'all .5s ease-in-out',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  },
}));

export default useStyles;
