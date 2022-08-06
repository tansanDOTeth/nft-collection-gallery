import 'simplebar/dist/simplebar.min.css';

import { Box } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';

const ScrollableBox = ({ children, sx = {} }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', ...sx }}>
      <SimpleBar style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        {children}
      </SimpleBar>
    </Box>
  )
}
export default ScrollableBox;
