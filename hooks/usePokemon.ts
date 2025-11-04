import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import type { Pokemon } from '@/types/pokemon';

type SortOrder = 'asc' | 'desc' | null;

export const usePokemon = (selectedTypes: string[] = [], searchTerm: string = '', sortOrder: SortOrder = null) => {
  // Fetch all pokemon with TanStack Query
  const {
    data: pokemon = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Pokemon[]>({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const response = await api.get('/pokemons');
      return response.data;
    },
  });

  // Filter and sort pokemon based on selected types, search term, and sort order
  const filteredPokemon = useMemo(() => {
    let filtered = pokemon;

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search)
      );
    }

    // Filter by selected types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p => 
        selectedTypes.some(selectedType => 
          p.types.some(pokemonType => 
            pokemonType.toLowerCase() === selectedType.toLowerCase()
          )
        )
      );
    }

    // Sort by name
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    }

    return filtered;
  }, [pokemon, selectedTypes, searchTerm, sortOrder]);

  return { 
    pokemon: filteredPokemon, 
    allPokemon: pokemon,
    loading: isLoading, 
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch Pokemon') : null, 
    refetch 
  };
};