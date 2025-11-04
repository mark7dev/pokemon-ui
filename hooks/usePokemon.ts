import { useState, useEffect, useMemo } from 'react';
import api from '@/config/axios';
import type { Pokemon } from '@/types/pokemon';

type SortOrder = 'asc' | 'desc' | null;

export const usePokemon = (selectedTypes: string[] = [], searchTerm: string = '', sortOrder: SortOrder = null) => {
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