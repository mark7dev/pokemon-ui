import type { Pokemon } from '@/types/pokemon';

export type SortOrder = 'asc' | 'desc' | null;

/**
 * Filter Pokemon by search term (name)
 */
export const filterBySearchTerm = (pokemon: Pokemon[], searchTerm: string): Pokemon[] => {
  if (!searchTerm.trim()) {
    return pokemon;
  }

  const search = searchTerm.toLowerCase().trim();
  return pokemon.filter((p) => p.name.toLowerCase().includes(search));
};

/**
 * Filter Pokemon by selected types
 */
export const filterByTypes = (pokemon: Pokemon[], selectedTypes: string[]): Pokemon[] => {
  if (selectedTypes.length === 0) {
    return pokemon;
  }

  return pokemon.filter((p) =>
    selectedTypes.some((selectedType) =>
      p.types.some((pokemonType) => pokemonType.toLowerCase() === selectedType.toLowerCase())
    )
  );
};

/**
 * Sort Pokemon by name
 */
export const sortByName = (pokemon: Pokemon[], sortOrder: SortOrder): Pokemon[] => {
  if (!sortOrder) {
    return pokemon;
  }

  return [...pokemon].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
};

/**
 * Apply all filters and sorting to Pokemon list
 */
export const applyFiltersAndSort = (
  pokemon: Pokemon[],
  filters: {
    selectedTypes: string[];
    searchTerm: string;
    sortOrder: SortOrder;
  }
): Pokemon[] => {
  let result = pokemon;

  result = filterBySearchTerm(result, filters.searchTerm);
  result = filterByTypes(result, filters.selectedTypes);
  result = sortByName(result, filters.sortOrder);

  return result;
};

