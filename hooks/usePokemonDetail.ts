import { useState, useEffect } from 'react';
import api from '@/config/axios';
import type { PokemonDetail } from '@/types/pokemon';

export const usePokemonDetail = (name: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get(`/pokemons/${name}`);
        console.log('Pokemon detail response:', response.data);
        setPokemon(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
        console.error('Error fetching Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  return { 
    pokemon, 
    loading, 
    error 
  };
};

