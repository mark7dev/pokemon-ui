'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { usePokemon } from '@/hooks/usePokemon';

interface TypeFilterContextType {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  pokemonCount: number;
  isLoading: boolean;
}

const TypeFilterContext = createContext<TypeFilterContextType | undefined>(undefined);

interface TypeFilterProviderProps {
  children: ReactNode;
}

export const TypeFilterProvider = ({ children }: TypeFilterProviderProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { pokemon, loading } = usePokemon(selectedTypes);

  const value = useMemo(
    () => ({
      selectedTypes,
      setSelectedTypes,
      pokemonCount: loading ? 0 : pokemon.length,
      isLoading: loading,
    }),
    [selectedTypes, pokemon, loading]
  );

  return (
    <TypeFilterContext.Provider value={value}>
      {children}
    </TypeFilterContext.Provider>
  );
};

export const useTypeFilter = () => {
  const context = useContext(TypeFilterContext);
  if (context === undefined) {
    throw new Error('useTypeFilter must be used within a TypeFilterProvider');
  }
  return context;
};

