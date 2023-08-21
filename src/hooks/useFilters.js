import { useCallback, useEffect, useState } from "react";

const getInitalFilters = (filterNames) =>
  filterNames.reduce((map, name) => {
    map[name] = false;
    return map;
  }, {})

export const useFilters = (keyNames = []) => {
  const [filters, setFilters] = useState({});

  const setFilter = useCallback((keyName, isChecked) => {
    setFilters((filters) =>
      ({ ...filters, [keyName]: isChecked })
    )
  }, [setFilters])

  const removeFilter = useCallback((keyName) => setFilter(keyName, false), [setFilter])
  const addFilter = useCallback((keyName) => setFilter(keyName, true), [setFilter])
  const clearFilters = useCallback(() => setFilters(getInitalFilters(keyNames)), [keyNames])

  useEffect(() => {
    setFilters(getInitalFilters(keyNames))
  }, [keyNames])

  return [
    filters,
    addFilter,
    removeFilter,
    clearFilters
  ]
}