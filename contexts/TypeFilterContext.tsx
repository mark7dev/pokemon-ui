'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TypeFilterContextType {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const TypeFilterContext = createContext<TypeFilterContextType | undefined>(undefined);

interface TypeFilterProviderProps {
  children: ReactNode;
}

export const TypeFilterProvider = ({ children }: TypeFilterProviderProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <TypeFilterContext.Provider value={{ selectedTypes, setSelectedTypes }}>
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

