import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useContext, useState } from 'react';

import { LeftColumn } from 'components/Layout';
import TextWithCount from 'components/TextWithCount';

const TraitFilters = ({ variationNamesByTraitName, getCount, isChecked, onChange }) => {
  const getKeyName = (layerName, variationName) => `${layerName}:${variationName}`
  return (
    Object.entries(variationNamesByTraitName)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([layerName, variationNames]) => <LeftColumn.ColumnAccordion
        key={layerName}
        title={
          <TextWithCount
            text={layerName}
            count={variationNames.length}
            sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }} />
        }>
        <FormGroup>
          {(variationNames || [])
            .sort((variationNameA, variationNameB) => getCount(getKeyName(layerName, variationNameB)) - getCount(getKeyName(layerName, variationNameA)))
            .map((variationName) => {
              const keyName = getKeyName(layerName, variationName);
              return <FormControlLabel
                key={keyName}
                onChange={onChange}
                disableTypography={true}
                label={
                  <TextWithCount
                    text={variationName}
                    count={getCount(keyName)}
                    sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }} />
                }
                sx={{ mr: 0 }}
                control={
                  <Checkbox
                    name={keyName}
                    checked={isChecked(keyName) || false}
                    size="small" />
                }
              />
            })}
        </FormGroup>
      </LeftColumn.ColumnAccordion>
      )

  );
}

export default TraitFilters;