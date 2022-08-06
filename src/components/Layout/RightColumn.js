import { Box } from '@mui/material';
import React from 'react';

const RightColumn = ({ sx = {}, children }) =>
  <Box sx={{
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    pr: 1,
    ...sx
  }}>
    {children}
  </Box>

export default RightColumn;