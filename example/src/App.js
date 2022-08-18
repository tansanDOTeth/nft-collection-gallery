import './App.css';

import { CssBaseline, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CollectionGallery from 'nft-collection-gallery';
import tokens from './tokens.json';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    }
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={3} sx={{ m: 5 }}>Test</Paper>
        <CollectionGallery tokens={tokens} />
      </ThemeProvider>
    </div>
  );
}

export default App;
