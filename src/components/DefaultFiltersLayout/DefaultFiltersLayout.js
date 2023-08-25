import React, { useCallback, useContext, useMemo } from 'react';

import TraitFilterContext from 'contexts/TraitFilterContext/TraitFilterContext';

const TraitFilter = ({ traitName, variationNames, getCount, onChange, isChecked }) => {
  const getKeyName = (traitName, variationName) => `${traitName}:${variationName}`

  const styles = {
    traitHeader: {
      paddingTop: '1.25rem',
      paddingBottom: '0.75rem',
      textAlign: 'left'
    },
    variationNames: {
      textAlign: 'left'
    },
    variationName: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between'
    }
  }

  return (
    <div>
      <div style={styles.traitHeader}>
        {traitName}
      </div>
      <div style={styles.variationNames}>
        {(variationNames || [])
          .sort((variationNameA, variationNameB) =>
            getCount(getKeyName(traitName, variationNameB)) - getCount(getKeyName(traitName, variationNameA)))
          .map((variationName) => {
            const keyName = getKeyName(traitName, variationName);
            return (
              <label
                key={keyName}
                style={styles.variationName}
                name={keyName}>
                <div>
                  <input
                    name={keyName}
                    type="checkbox"
                    checked={isChecked(keyName) || false}
                    onChange={onChange}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span>{variationName}</span>
                </div>
                <span>{getCount(keyName)}</span>
              </label>
            )
          })}
      </div>
    </div>
  )
}

const TraitFilters = ({ variationNamesByTraitName, ...otherProps }) => {
  const entries = useMemo(() =>
    Object.entries(variationNamesByTraitName)
      .sort((a, b) => a[0].localeCompare(b[0])),
    [variationNamesByTraitName]
  )

  return entries.map(([traitName, variationNames]) =>
    <TraitFilter
      key={traitName}
      traitName={traitName}
      variationNames={variationNames}
      {...otherProps} />
  )
}

const DefaultFiltersLayout = () => {
  const { variationNamesByTraitName, tokenCountByVariationName, filters, addFilter, removeFilter } = useContext(TraitFilterContext);
  const getCount = useCallback((key) => tokenCountByVariationName[key], [tokenCountByVariationName]);
  const isChecked = useCallback((key) => filters[key], [filters]);
  const onChange = useCallback(({ target: { name, checked } }) => {
    if (checked) {
      addFilter(name)
    } else {
      removeFilter(name)
    }
  }, [addFilter, removeFilter]);

  return <TraitFilters
    variationNamesByTraitName={variationNamesByTraitName}
    getCount={getCount}
    onChange={onChange}
    isChecked={isChecked} />
}

export default DefaultFiltersLayout;
