import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/services/pokemonApi';
import { queryKeys } from '@/constants/queryKeys';
import { applyFiltersAndSort, type SortOrder } from '@/utils/pokemonFilters';
import { getErrorMessage } from '@/utils/errorHandler';
import type { Pokemon } from '@/types/pokemon';

interface UsePokemonParams {
  selectedTypes?: string[];
  searchTerm?: string;
  sortOrder?: SortOrder;
}

export const usePokemon = ({
  selectedTypes = [],
  searchTerm = '',
  sortOrder = null,
}: UsePokemonParams = {}) => {
  const {
    data: allPokemon = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Pokemon[]>({
    queryKey: queryKeys.pokemon.all,
    queryFn: pokemonApi.getAll,
  });

  const filteredPokemon = useMemo(
    () =>
      applyFiltersAndSort(allPokemon, {
        selectedTypes,
        searchTerm,
        sortOrder,
      }),
    [allPokemon, selectedTypes, searchTerm, sortOrder]
  );

  return {
    pokemon: filteredPokemon,
    allPokemon,
    loading: isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
};