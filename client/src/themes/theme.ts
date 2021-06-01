import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
  },
  shape: {
    borderRadius: 5,
  },
});
