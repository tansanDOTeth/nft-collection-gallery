import React, { createContext, useEffect, useState } from 'react';

import { CartesianProduct } from 'js-combinatorics';

const TraitFilterContext = createContext({});

export default TraitFilterContext;

const uniqueItems = (items, uniqueKey) => {
  let getItemKey = (item) => item[uniqueKey];
  return [...new Map(items.map((item) => [getItemKey(item), item])).values()];
}
const isSuperSet = (source, target) => target.every(v => source.includes(v));
const getInitalFilters = (filterNames) => filterNames.reduce((acc, name) => ({ ...acc, [name]: false }), {});
const groupByTraitName = (filterNames) => filterNames.reduce((acc, keyName) => {
  const split = keyName.split(':');
  const traitName = split[0];
  const group = (acc[traitName] || []);
  group.push(keyName);
  acc[traitName] = group;
  return acc
}, {});

const getTokensByVariationName = (tokens) => {
  const tokensByVariationName = {}
  tokens.forEach(token => {
    token.attributes.forEach(({ trait_type, value }) => {
      const keyName = `${trait_type}:${value}`
      if (!tokensByVariationName[keyName]) {
        tokensByVariationName[keyName] = [token]
      } else {
        tokensByVariationName[keyName].push(token)
      }
    })
  })

  return tokensByVariationName;
}

const getVariationNamesByTraitName = (tokens) => {
  const traitValueByTraitName = {}
  const allUniqueAttributes = uniqueItems(tokens.flatMap(token => token.attributes), 'value')
  allUniqueAttributes.forEach(({ trait_type, value }) => {
    if (!traitValueByTraitName[trait_type]) {
      traitValueByTraitName[trait_type] = [value]
    } else {
      traitValueByTraitName[trait_type].push(value)
    }
  })

  return traitValueByTraitName;
}

export const TraitFilterContextProvider = ({ children, tokens, onFilterChange }) => {
  const [filteredTokens, setFilteredTokens] = useState([])
  const [variationNamesByTraitName, setVariationNamesByTraitName] = useState({});
  const [tokensByVariationName, setTokensByVariationName] = useState({});

  /*
    selectedFilters Data Structure:
      {
        [variationName]: false
      }
  */
  const [selectedFilters, setSelectedFilters] = useState({});

  const removeFilter = (keyName) => {
    setSelectedFilters({
      ...selectedFilters,
      [keyName]: false
    })
  }

  const getKeyName = ({ trait_type, value }) => `${trait_type}:${value}`

  const filterTokens = (selectedFilters) => {
    if (!selectedFilters) {
      return tokens;
    }
    const checkedVariationNames = Object.entries(selectedFilters).filter(([name, isChecked]) => isChecked).flatMap(([name]) => name)
    if (checkedVariationNames.length === 0) {
      return tokens;
    }

    const groupedVariationNames = Object.values(groupByTraitName(checkedVariationNames));
    let attributeCombinations = [...new CartesianProduct(...groupedVariationNames)];

    return tokens.filter(token => {
      const keyNames = token.attributes.map(attribute => getKeyName(attribute));
      return attributeCombinations.find(attributeCombination => isSuperSet(keyNames, attributeCombination))
    })
  }

  useEffect(() => {
    setVariationNamesByTraitName(getVariationNamesByTraitName(tokens))
    setTokensByVariationName(getTokensByVariationName(tokens))
    setSelectedFilters(getInitalFilters(Object.keys(tokensByVariationName)))
  }, [tokens])

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedFilters)
    }
    
    setFilteredTokens(filterTokens(selectedFilters))
  }, [selectedFilters])

  let context = {
    variationNamesByTraitName,
    tokensByVariationName,
    selectedFilters,
    setSelectedFilters,
    removeFilter,
    filteredTokens
  };

  return (
    <TraitFilterContext.Provider value={context}>
      {children}
    </TraitFilterContext.Provider>
  );
};

TraitFilterContextProvider.defaultProps = {
  tokens: [],
}

export const { Consumer: TraitFilterContextConsumer } = TraitFilterContext;
