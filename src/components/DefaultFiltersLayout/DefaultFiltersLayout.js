import { LeftColumn } from 'components/Layout';
import React from 'react';
import TraitFilters from 'components/TraitFilters';

const DefaultFiltersLayout = ({ TraitFilterContextConsumer }) =>
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
              });
            }}
            isChecked={(key) => selectedFilters[key]} />
        }
      </TraitFilterContextConsumer>
    </LeftColumn.ColumnBox>
  </LeftColumn>;

export default DefaultFiltersLayout;
