import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize your theme here if needed
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
