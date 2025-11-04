import api from '@/config/axios';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

/**
 * API service for Pokemon-related endpoints
 * Separates API logic from React hooks
 */
export const pokemonApi = {
  /**
   * Fetches all Pokemon
   */
  getAll: async (): Promise<Pokemon[]> => {
    const response = await api.get<Pokemon[]>('/pokemons');
    return response.data;
  },

  /**
   * Fetches a single Pokemon by name
   */
  getByName: async (name: string): Promise<PokemonDetail> => {
    const response = await api.get<PokemonDetail>(`/pokemons/${name}`);
    return response.data;
  },
};

