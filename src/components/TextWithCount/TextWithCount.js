import React from 'react';
import { Typography } from '@mui/material';

const TextWithCount = ({ text, count, sx }) =>
  <Typography sx={sx} component="span">
    {text}{' '} <Typography component="span" color="action.disabled">({count})</Typography>
  </Typography>

export default TextWithCount;