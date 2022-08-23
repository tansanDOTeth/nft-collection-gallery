import React, { Fragment } from 'react';

import CurrentFilters from 'components/CurrentFilters';

const DefaultCurrentFiltersLayout = ({ TraitFilterContextConsumer }) =>
  <Fragment>
    <TraitFilterContextConsumer>
      {({ selectedFilters, removeFilter }) => <CurrentFilters filters={selectedFilters} onDelete={removeFilter} />}
    </TraitFilterContextConsumer>
  </Fragment>;

export default DefaultCurrentFiltersLayout;