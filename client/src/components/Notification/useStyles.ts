import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  navButton: {
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
}));

export default useStyles;
