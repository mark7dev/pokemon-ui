import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import type { PokemonDetail } from '@/types/pokemon';

export const usePokemonDetail = (name: string) => {
  const {
    data: pokemon = null,
    isLoading,
    error,
  } = useQuery<PokemonDetail>({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const response = await api.get(`/pokemons/${name}`);
      return response.data;
    },
    enabled: !!name, // Only fetch if name is provided
  });

  return { 
    pokemon, 
    loading: isLoading, 
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch Pokemon') : null 
  };
};

