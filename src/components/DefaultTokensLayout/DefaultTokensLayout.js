import React, { Fragment } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import GalleryItem from '../CollectionGallery/GalleryItem';

const DefaultTokensLayout = ({ TraitFilterContextConsumer }) =>
  <Fragment>
    <TraitFilterContextConsumer>
      {({ filteredTokens }) => <AutoSizer>
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
                );
              }}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>}
    </TraitFilterContextConsumer>
  </Fragment>;

export default DefaultTokensLayout;