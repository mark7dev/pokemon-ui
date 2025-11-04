import { useState, useEffect, useMemo } from 'react';
import api from '@/config/axios';
import type { Pokemon } from '@/types/pokemon';

export const usePokemon = (selectedTypes: string[] = []) => {
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

  // Filter pokemon based on selected types
  const filteredPokemon = useMemo(() => {
    if (selectedTypes.length === 0) {
      return pokemon;
    }
    
    return pokemon.filter(p => 
      selectedTypes.some(selectedType => 
        p.types.some(pokemonType => 
          pokemonType.toLowerCase() === selectedType.toLowerCase()
        )
      )
    );
  }, [pokemon, selectedTypes]);

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

  return { 
    pokemon: filteredPokemon, 
    allPokemon: pokemon,
    loading, 
    error, 
    refetch 
  };
};