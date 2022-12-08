import { createTheme } from '@mui/material/styles'

// https://mui.com/material-ui/customization/theming/
export const theme = createTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff',
    },
  },
})

// https://mui.com/material-ui/customization/dark-mode/
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff',
    },
    secondary: {
      light: '#58a5f0',
      main: '#0277bd',
      dark: '#004c8c',
      contrastText: '#fff',
    },
  },
})
