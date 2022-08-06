import { Box, Chip } from '@mui/material';

import LayersIcon from '@mui/icons-material/Layers';
import React from 'react';
import { styled } from '@mui/material/styles'

const ChipsListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
  marginBottom: theme.spacing(1)
}));

const CurrentFilters = ({ filters, onDelete, getName, getIcon }) =>
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      p: 0.5,
      m: 0,
    }}
    component="ul"
  >
    {Object.entries(filters).filter(([name, isChecked]) => isChecked).map(([name]) =>
      <ChipsListItem key={name}>
        <Chip
          icon={getIcon(name)}
          label={getName(name)}
          onDelete={() => onDelete(name)}
        />
      </ChipsListItem>
    )}
  </Box>

CurrentFilters.defaultProps = {
  filters: [],
  onDelete: () => { },
  getName: (name) => name,
  getIcon: (name) => <LayersIcon fontSize="small" />
}

export default CurrentFilters;