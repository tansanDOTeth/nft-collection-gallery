import DefaultCurrentFiltersLayout from 'components/DefaultCurrentFiltersLayout';
import DefaultFiltersLayout from 'components/DefaultFiltersLayout';
import DefaultGalleryLayout from 'components/DefaultGalleryLayout';
import DefaultTokensLayout from 'components/DefaultTokensLayout';
import React from 'react';
import { TraitFilterContextProvider } from 'contexts/TraitFilterContext';

const CollectionGallery = ({
  tokens,
  GalleryLayout = DefaultGalleryLayout,
  FiltersLayout = DefaultFiltersLayout,
  TokensLayout = DefaultTokensLayout,
  CurrentFiltersLayout = DefaultCurrentFiltersLayout,
}) =>
  <TraitFilterContextProvider tokens={tokens}>
    <GalleryLayout
      FiltersLayout={FiltersLayout}
      TokensLayout={TokensLayout}
      CurrentFiltersLayout={CurrentFiltersLayout}
    />
  </TraitFilterContextProvider >

export default CollectionGallery;