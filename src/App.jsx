import { useState } from 'react'
import reactLogo from './assets/camptime.gif'
import viteLogo from '/vite.svg'
import './App.css'
import Mob from './components/UI/Mob/Mob'
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: '#7d54b4', // Change this to the primary color you want
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Change this to your desired font family
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#757575', // Change this to the placeholder color you want
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: '#2196f3', // Change this to the hover border color you want
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#757575', // Change this to the icon color you want
        },
      },
    },
  },
});

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <ThemeProvider theme={theme}>
        <h1>Camptime</h1>
        <Mob />
      </ThemeProvider>

    </>
  )
}

export default App
