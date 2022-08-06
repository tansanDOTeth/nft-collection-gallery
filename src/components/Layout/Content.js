import { Box } from '@mui/material';
import React from 'react';

const Content = ({ children, sx, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        height: '100%',
        ...sx
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Content;
