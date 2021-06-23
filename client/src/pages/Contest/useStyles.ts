import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5rem',
  },
  contestBox: {
    width: '75%',
  },
  contestHeader: {
    textAlign: 'left',
    marginTop: '.5em',
    fontStyle: 'bold',
    fontSize: '35px',
  },
  prizeTag: {
    margin: theme.spacing(1.5, 4, 2),
    width: 75,
    height: 35,
    borderRadius: 0,
    fontSize: 15,
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'left',
    justifyContent: 'space-between',
  },

  profilePic: {
    borderRadius: '50%',
    height: 50,
    width: 50,
  },
  creatorName: {
    paddingLeft: '10px',
    fontStyle: 'bold',
    fontSize: '15px',
    color: 'black',
  },
  accBtn: {
    width: 170,
    height: 54,
    border: '1px solid black',
    borderRadius: '0%',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: 'white',
    color: '#black',
    boxShadow: 'none',
    marginRight: 0,
    display: 'flex',
    alignItems: 'right',
    marginBottom: '20px',
    paddingLeft: '20px',
    '&:hover': { color: 'white', backgroundColor: 'black' },
  },
  submitButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submissionsBox: {
    marginTop: '5rem',
    width: '75%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  contestImages: {
    margin: '25px 0',
    border: '1px solid lightgrey',
    padding: '20px',
    width: '75%',
  },
  imageGridList: {
    width: '100%',
    height: '100%',
  },
  winnerTag: {
    margin: theme.spacing(1.5, 4, 2),
    width: 95,
    height: 35,
    borderRadius: 0,
    fontSize: 15,
    backgroundColor: 'white',
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    backgroundColor: 'white',
    display: 'flex',
    width: '50%',
    height: '20%',
    margin: '125px auto',
    flexDirection: 'column',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
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
}));

export default useStyles;
