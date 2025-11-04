import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/services/pokemonApi';
import { queryKeys } from '@/constants/queryKeys';
import { getErrorMessage } from '@/utils/errorHandler';
import type { PokemonDetail } from '@/types/pokemon';

export const usePokemonDetail = (name: string) => {
  const {
    data: pokemon = null,
    isLoading,
    error,
  } = useQuery<PokemonDetail>({
    queryKey: queryKeys.pokemon.detail(name),
    queryFn: () => pokemonApi.getByName(name),
    enabled: !!name,
  });

  return {
    pokemon,
    loading: isLoading,
    error: error ? getErrorMessage(error) : null,
  };
};

