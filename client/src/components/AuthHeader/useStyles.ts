import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    width: '100%',
  },
  accAside: {
    fontSize: 26,
    color: 'white',
    fontWeight: 400,
    textAlign: 'left',
    marginRight: 35,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'left',
    padding: '1rem 1rem',
  },
  link: { textDecoration: 'none' },
  accBtn: {
    width: 170,
    height: 54,
    border: '1px solid white',
    borderRadius: '0%',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#000000',
    color: '#f4f4f4',
    boxShadow: 'none',
    marginRight: 35,
    display: 'flex',
    alignItems: 'right',
    '&:hover': { color: 'black' },
  },
}));

export default useStyles;
