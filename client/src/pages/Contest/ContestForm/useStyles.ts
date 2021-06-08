import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
  contestTitle: {
    fontSize: 26,
    textAlign: 'center',
    margin: 30,
    color: '#000000',
    fontWeight: 700,
  },
  contestFormBox: {
    borderRadius: '5px',
    minHeight: '80vh',
    alignItems: 'center',
  },
  contestFormContainer: {
    paddingLeft: '150px',
    paddingTop: '50px',
  },
  contestFormLabel: {
    fontSize: 16,
    fontWeight: 700,
  },
  contestTextInput: {
    marginTop: '10px',
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
  },
  contestDateInput: {
    marginLeft: '38px',

    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 10px',
    },
  },

  imageBox: {
    borderRadius: '5px',
    overflow: 'hidden',
    alignItems: 'center',
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
  imageGridList: {
    width: 400,
    height: 300,
  },
  contestImages: {
    marginTop: '50px',
    border: '1px solid lightgrey',
    padding: '20px',
  },
  contestPrizeError: {
    color: 'red',
    fontSize: '11px',
  },
  prizeInput: {
    border: '1px solid lightgrey',
    '&:hover': { border: '1px solid black' },
    '&&&:before': {
      border: 'none',
    },
  },
}));

export default useStyles;
