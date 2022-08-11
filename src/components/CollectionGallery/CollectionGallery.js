import { Paper } from '@mui/material';
import { LeftColumn, RightColumn } from 'components/Layout';
import React from 'react';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { TraitFilterContextConsumer, TraitFilterContextProvider } from 'contexts/TraitFilterContext';

import { Content } from 'components/Layout';
import CurrentFilters from 'components/CurrentFilters';
import GalleryItem from './GalleryItem';
import TraitFilters from 'components/TraitFilters';

const CollectionGallery = ({ tokens }) => {
  return (
    <Paper
      elevation={3}
      sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, p: 1 }}
    >
      <TraitFilterContextProvider tokens={tokens}>
        <Content sx={{ flexDirection: 'row' }}>
          <LeftColumn>
            <LeftColumn.ColumnBox>
              <TraitFilterContextConsumer>
                {({ variationNamesByTraitName, tokensByVariationName, selectedFilters, setSelectedFilters }) =>
                  <TraitFilters
                    variationNamesByTraitName={variationNamesByTraitName}
                    getCount={(key) => tokensByVariationName[key].length}
                    onChange={({ target: { name, checked } }) => {
                      setSelectedFilters({
                        ...selectedFilters,
                        [name]: checked
                      })
                    }}
                    isChecked={(key) => selectedFilters[key]} />
                }
              </TraitFilterContextConsumer>
            </LeftColumn.ColumnBox>
          </LeftColumn>
          <RightColumn>
              <TraitFilterContextConsumer>
                {({ selectedFilters, removeFilter }) =>
                  <CurrentFilters filters={selectedFilters} onDelete={removeFilter} />
                }
              </TraitFilterContextConsumer>
              <TraitFilterContextConsumer>
                {({ filteredTokens }) =>
                    <AutoSizer>
                      {({ height, width }) => {
                        const ROW_GUTTER = 20;
                        const COLUMN_GUTTER = 20;
                        const CARD_WIDTH = 250;
                        const CARD_HEIGHT = 290;

                        const columnCount = Math.floor(width / (CARD_WIDTH + COLUMN_GUTTER));
                        const rowCount = Math.ceil(filteredTokens.length / columnCount);

                        return (
                          <FixedSizeGrid
                            columnCount={columnCount}
                            columnWidth={width / columnCount}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={CARD_HEIGHT + ROW_GUTTER}
                            width={width}
                          >
                            {({ columnIndex, rowIndex, style }) => {
                              const token = filteredTokens[rowIndex * columnCount + columnIndex];

                              if (!token) {
                                return null;
                              }
                              
                              return (
                                <div style={style}>
                                  <GalleryItem token={token} />
                                </div>
                              )
                            }}
                          </FixedSizeGrid>
                        )
                      }}
                    </AutoSizer>
                }
              </TraitFilterContextConsumer>
          </RightColumn>
        </Content>
      </TraitFilterContextProvider>
    </Paper>
  )
}

export default CollectionGallery;