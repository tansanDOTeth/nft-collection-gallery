import { ThemeProvider, createTheme } from '@mui/material/styles';

import { CssBaseline, } from '@mui/material';
import React from 'react';

export const decorators = [
  (Story) => {
    const theme = createTheme({
      palette: {
        mode: 'dark',
      }
    });
    console.log("decorators")
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    )
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}