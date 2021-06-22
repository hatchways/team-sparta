import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    '&::-webkit-Scrollbar': {
      display: 'none',
    },
  },
  contestGrid: {
    width: '100%',
    height: '100%',
    '&::-webkit-Scrollbar': {
      display: 'none',
    },
  },
  title: {
    display: 'inline',
    fontSize: '2.5rem',
    fontWeight: 1000,
  },
  link: {
    width: '100%',
    height: '100%',
    borderRadius: '0%',
    padding: 0,
  },
  contestImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  listContainer: {
    height: '100%',
  },
}));

export default useStyles;
