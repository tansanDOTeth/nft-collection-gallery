import React from 'react';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0.5rem',
    margin: 0,
  },
  filter: {
    border: '1px solid grey',
    borderRadius: 2,
    padding: '0.5rem',
    marginRight: '0.5rem',
    cursor: 'pointer'
  }
}

const SelectedFilter = ({ name, onClick }) =>
  <li
    style={styles.filter}
    onClick={() => onClick(name)}>
    {name}
  </li>

const DefaultCurrentFiltersLayout = ({ TraitFilterContextConsumer }) =>
  <ul style={styles.wrapper}>
    <TraitFilterContextConsumer>
      {({ selectedFilters, removeFilter }) =>
        Object.entries(selectedFilters)
          .filter(([name, isChecked]) => isChecked)
          .map(([name]) =>
            <SelectedFilter
              key={name}
              name={name}
              onClick={removeFilter} />
          )
      }
    </TraitFilterContextConsumer>
  </ul>;

export default DefaultCurrentFiltersLayout;