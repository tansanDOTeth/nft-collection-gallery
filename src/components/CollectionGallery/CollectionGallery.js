import {
  AppBar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Toolbar,
} from '@mui/material';
import { LeftColumn, RightColumn, ScrollableBox } from 'components/Layout';
import React, { useState } from 'react';
import { TraitFilterContextConsumer, TraitFilterContextProvider } from 'contexts/TraitFilterContext';

import { Content } from 'components/Layout';
import CurrentFilters from 'components/CurrentFilters';
import GalleryItem from './GalleryItem';
import TraitFilters from 'components/TraitFilters';

const CollectionGallery = ({ tokens }) => {

  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const onPageChange = (event, newPage) => setPage(newPage)

  const currentPageTokens = (filteredTokens) => {
    const startIndex = (page - 1) * perPage;
    const endINdex = (page * perPage);
    return filteredTokens.slice(startIndex, endINdex)
  }

  const updatePerPage = (event) => {
    setPerPage(event.target.value);
    setPage(1)
  };

  return (
    <Paper
      elevation={3}
      sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, p: 1 }}
    >
      <TraitFilterContextProvider tokens={tokens} onFilterChange={() => setPage(1)}>
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
            <ScrollableBox sx={{ display: 'flex', flexDirection: 'column', mb: 5 }}>
              <TraitFilterContextConsumer>
                {({ selectedFilters, removeFilter }) =>
                  <CurrentFilters filters={selectedFilters} onDelete={removeFilter} />
                }
              </TraitFilterContextConsumer>
              <TraitFilterContextConsumer>
                {({ filteredTokens }) =>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {currentPageTokens(filteredTokens).map((token) => <GalleryItem key={token.name} token={token} />)}
                  </Box>
                }
              </TraitFilterContextConsumer>
            </ScrollableBox>
            <AppBar position='sticky' sx={{ bottom: 0, height: 72 }}>
              <TraitFilterContextConsumer>
                {({ filteredTokens }) =>
                  <Toolbar>
                    <Pagination
                      sx={{ flexGrow: 1 }}
                      count={Math.ceil(filteredTokens.length / perPage)}
                      page={page}
                      onChange={onPageChange}
                      siblingCount={5}
                      boundaryCount={5}
                      shape="rounded" />
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel>Per Page</InputLabel>
                      <Select
                        value={perPage}
                        onChange={updatePerPage}
                        autoWidth
                        label="Per Page"
                      >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    </FormControl>
                  </Toolbar>
                }
              </TraitFilterContextConsumer>
            </AppBar>
          </RightColumn>
        </Content>
      </TraitFilterContextProvider>
    </Paper>
  )
}

export default CollectionGallery;