// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Blue for trust and professionalism
    },
    secondary: {
      main: '#f50057', // Pink for action elements
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: '500',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
