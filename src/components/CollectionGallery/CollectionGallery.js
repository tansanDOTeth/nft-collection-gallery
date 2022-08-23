import { TraitFilterContextConsumer, TraitFilterContextProvider } from 'contexts/TraitFilterContext';

import DefaultCurrentFiltersLayout from 'components/DefaultCurrentFiltersLayout';
import DefaultFiltersLayout from 'components/DefaultFiltersLayout';
import DefaultGalleryLayout from 'components/DefaultGalleryLayout';
import DefaultTokensLayout from 'components/DefaultTokensLayout';
import React from 'react';

const withTraitFilterContextConsumer = (Component) => (props) =>
  <Component
    TraitFilterContextConsumer={TraitFilterContextConsumer}
    {...props} />

const CollectionGallery = ({
  tokens,
  GalleryLayout = DefaultGalleryLayout,
  FiltersLayout = DefaultFiltersLayout,
  TokensLayout = DefaultTokensLayout,
  CurrentFiltersLayout = DefaultCurrentFiltersLayout,
}) => {
  const DecoratedGalleryLayout = withTraitFilterContextConsumer(GalleryLayout);
  const DecoratedFiltersLayout = withTraitFilterContextConsumer(FiltersLayout);
  const DecoratedTokensLayout = withTraitFilterContextConsumer(TokensLayout);
  const DecoratedCurrentFiltersLayout = withTraitFilterContextConsumer(CurrentFiltersLayout);
  return (
    <TraitFilterContextProvider tokens={tokens}>
      <DecoratedGalleryLayout
        FiltersLayout={DecoratedFiltersLayout}
        TokensLayout={DecoratedTokensLayout}
        CurrentFiltersLayout={DecoratedCurrentFiltersLayout}
      />
    </TraitFilterContextProvider >
  )
}

export default CollectionGallery;