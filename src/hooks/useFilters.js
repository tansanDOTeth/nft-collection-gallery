import { useEffect, useState } from "react";

const getInitalFilters = (filterNames) =>
  filterNames.reduce((map, name) => {
    map[name] = false;
    return map;
  }, {})

export const useFilters = (keyNames = []) => {
  const [filters, setFilters] = useState({});

  const setFilter = (keyName, isChecked) => {
    setFilters((filters) =>
      ({ ...filters, [keyName]: isChecked })
    )
  }

  const removeFilter = (keyName) => setFilter(keyName, false)
  const addFIlter = (keyName) => setFilter(keyName, true)

  useEffect(() => {
    setFilters(getInitalFilters(keyNames))
  }, [keyNames])

  return [
    filters,
    addFIlter,
    removeFilter,
  ]
}