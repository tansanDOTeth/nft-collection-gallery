import React from 'react';

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

const TraitFilters = ({ variationNamesByTraitName, ...otherProps }) =>
  Object.entries(variationNamesByTraitName)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([traitName, variationNames]) =>
      <TraitFilter
        key={traitName}
        traitName={traitName}
        variationNames={variationNames}
        {...otherProps} />
    )

const DefaultFiltersLayout = ({ TraitFilterContextConsumer }) =>
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

export default DefaultFiltersLayout;
