import React from 'react';
import { Typography } from '@mui/material';

const LabelStack = ({ label, content, sx }) =>
  <Typography component="div" sx={sx}>
    <Typography component="div" variant="overline" color="action.disabled" sx={{ lineHeight: 'normal' }}>
      {label}
    </Typography>
    {content}
  </Typography>

export default LabelStack;