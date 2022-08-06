import './App.css';

import { Box, CssBaseline, } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CollectionGallery from 'components/CollectionGallery';
import React from 'react';
import tokens from './tokens.json'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    }
  });
  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CollectionGallery tokens={tokens} />
      </ThemeProvider>
    </Box >
  );
}

export default App;
