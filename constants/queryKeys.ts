/**
 * Centralized query keys for TanStack Query
 * Ensures consistency and prevents typos
 */
export const queryKeys = {
  pokemon: {
    all: ['pokemon'] as const,
    lists: () => [...queryKeys.pokemon.all, 'list'] as const,
    list: (filters: string[]) => [...queryKeys.pokemon.lists(), { filters }] as const,
    details: () => [...queryKeys.pokemon.all, 'detail'] as const,
    detail: (name: string) => [...queryKeys.pokemon.details(), name] as const,
  },
} as const;

