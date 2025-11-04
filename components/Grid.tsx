'use client';

import { PokemonCard } from './Card';
import { usePokemon } from '@/hooks/usePokemon';
import { SimpleLoading } from './SimpleLoading';
import { ErrorState } from './common/ErrorState';
import { EmptyState } from './common/EmptyState';
import type { SortOrder } from '@/utils/pokemonFilters';

interface GridProps {
  selectedTypes: string[];
  searchTerm: string;
  sortOrder: SortOrder;
}

export const Grid = ({ selectedTypes, searchTerm, sortOrder }: GridProps) => {
  const { pokemon, loading, error } = usePokemon({
    selectedTypes,
    searchTerm,
    sortOrder,
  });

  if (error) {
    return <ErrorState message="Error loading Pokemon" error={error} />;
  }

  if (loading) {
    return <SimpleLoading />;
  }

  if (pokemon.length === 0) {
    return <EmptyState message="No Pokemon found" />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.name} pokemon={poke} />
      ))}
    </div>
  );
};