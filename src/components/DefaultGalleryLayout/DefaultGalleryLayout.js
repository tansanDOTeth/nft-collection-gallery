import { Content } from 'components/Layout';
import { Paper } from '@mui/material';
import React from 'react';
import { RightColumn } from 'components/Layout';

const DefaultGalleryLayout = ({ TraitFilterContextConsumer, FiltersLayout, TokensLayout, CurrentFiltersLayout }) =>
  <Paper
    elevation={3}
    sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, p: 1 }}
  >
    <Content sx={{ flexDirection: 'row' }}>
      <FiltersLayout />
      <RightColumn>
        <CurrentFiltersLayout />
        <TokensLayout />
      </RightColumn>
    </Content>
  </Paper>;

export default DefaultGalleryLayout;