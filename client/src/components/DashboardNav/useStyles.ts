import { makeStyles, createStyles } from '@material-ui/core/styles';

interface MyTheme {
  border: string;
}

const useStyles = makeStyles((theme: MyTheme) =>
  createStyles({
    navButton: {
      width: 170,
      height: 54,
      border: theme.border,
      borderRadius: '0%',
      filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
      backgroundColor: '#000000',
      color: '#f4f4f4',
      boxShadow: 'none',
      marginRight: 35,
      display: 'flex',
      alignItems: 'right',
      '&:hover': { color: 'grey' },
    },
    link: { textDecoration: 'none' },
  }),
);

export default useStyles;
