import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
  logo: {
    width: '100%',
  },
  accBtn: {
    width: 170,
    height: 54,
    border: '1px solid white',
    borderRadius: '0%',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#000000',
    color: '#f4f4f4',
    boxShadow: 'none',
    marginRight: 1,
    display: 'flex',
    alignItems: 'right',
    '&:hover': { color: 'black' },
  },
  navButton: {
    width: 300,
    height: 54,
    borderRadius: '0%',
    padding: '1rem 1rem',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#000000',
    color: '#f4f4f4',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'left',
    '&:hover': { color: 'grey' },
  },
  container: {
    float: 'left',
    alignSelf: 'left',
    alignItems: 'left',
    marginLeft: 0,
    width: 'auto',
  },
}));

export default useStyles;
