import { useState, useEffect } from 'react';
import api from '@/config/axios';

export interface Pokemon {
  name: string;
  types: string[];
  image: string;
}

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/pokemons');
        setPokemon(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
        console.error('Error fetching Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/pokemons');
      setPokemon(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
      console.error('Error fetching Pokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, loading, error, refetch };
};