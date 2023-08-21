import React, { createContext, useMemo } from 'react';

import { CartesianProduct } from 'js-combinatorics';
import { useFilters } from 'hooks/useFilters';

const TraitFilterContext = createContext({});

export default TraitFilterContext;

const isSuperSet = (source, target) => target.every(v => source.includes(v));
const groupByTraitName = (filterNames) =>
  filterNames.reduce((map, keyName) => {
    const split = keyName.split(':');
    const traitName = split[0];
    const group = (map[traitName] || []);
    group.push(keyName);
    map[traitName] = group;
    return map
  }, {});

const getTokenCountByVariationName = (tokens) => {
  const map = {}
  for (let token of tokens) {
    for (let { trait_type, value } of token.attributes) {
      const keyName = `${trait_type}:${value}`
      if (!map[keyName]) {
        map[keyName] = 0;
      }
      map[keyName] += 1;
    }
  }
  return map;
}

const getVariationNamesByTraitName = (tokens) => {
  const traitValueByTraitName = {}
  tokens.forEach(token => {
    token.attributes.forEach(({ trait_type, value }) => {
      if (!traitValueByTraitName[trait_type]) {
        traitValueByTraitName[trait_type] = new Set()
      }
      traitValueByTraitName[trait_type].add(value)
    })
  })

  Object.entries(traitValueByTraitName).forEach(([traitName, variations]) => {
    traitValueByTraitName[traitName] = [...variations]
  })

  return traitValueByTraitName;
}

const getKeyName = ({ trait_type, value }) => `${trait_type}:${value}`

const filterTokens = (filters, tokens) => {
  if (!filters) {
    return tokens;
  }
  const checkedVariationNames = Object.entries(filters).filter(([name, isChecked]) => isChecked).flatMap(([name]) => name)
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

export const TraitFilterContextProvider = ({ children, tokens, onFilterChange }) => {
  const [variationNamesByTraitName, tokenCountByVariationName] = useMemo(() => {
    return [
      getVariationNamesByTraitName(tokens),
      getTokenCountByVariationName(tokens),
    ]
  }, [tokens])

  const filterKeyNames = useMemo(() => Object.keys(tokenCountByVariationName), [tokenCountByVariationName])
  const [filters, addFilter, removeFilter, clearFilters] = useFilters(filterKeyNames);
  const filteredTokens = useMemo(() => {
    if (onFilterChange) {
      onFilterChange(filters)
    }

    return filterTokens(filters, tokens)
  }, [filters, tokens])

  let context = {
    variationNamesByTraitName,
    tokenCountByVariationName,
    filters,
    addFilter,
    removeFilter,
    clearFilters,
    tokens,
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
