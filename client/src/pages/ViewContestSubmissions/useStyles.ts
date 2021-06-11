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
    display: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profilePic: {
    borderRadius: '50%',
    height: 50,
    width: 50,
  },
  creatorName: {
    textAlign: 'left',
    fontStyle: 'bold',
    fontSize: '45px',
    color: 'black',
  },
  submissionsBox: {
    marginTop: '5rem',
    width: '75%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  contestImages: {
    marginTop: '50px',
    border: '1px solid lightgrey',
    padding: '20px',
  },
  imageGridList: {
    width: '100%',
    height: '100%',
  },
}));

export default useStyles;
