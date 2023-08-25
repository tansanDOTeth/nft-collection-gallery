import React, { useContext, useMemo } from 'react';

import TraitFilterContext from 'contexts/TraitFilterContext';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    gap: '0.5rem',
    padding: '0.5rem',
    margin: 0,
  },
  filter: {
    border: '1px solid grey',
    borderRadius: 2,
    padding: '0.5rem',
    cursor: 'pointer'
  }
}

const SelectedFilter = ({ name, onClick }) =>
  <li
    style={styles.filter}
    onClick={() => onClick(name)}>
    {name.split(':').join(' - ')}
  </li>

const DefaultCurrentFiltersLayout = () => {
  const { filters, removeFilter, clearFilters } = useContext(TraitFilterContext);
  const hasFilters = useMemo(() => Object.values(filters).some(isChecked => isChecked), [filters]);

  if (!hasFilters) return <></>
  return <ul style={styles.wrapper}>
    <button onClick={clearFilters}>Clear Filters</button>
    {Object.entries(filters)
      .filter(([name, isChecked]) => isChecked)
      .map(([name]) =>
        <SelectedFilter
          key={name}
          name={name}
          onClick={removeFilter} />
      )}
  </ul>;
}

export default DefaultCurrentFiltersLayout;