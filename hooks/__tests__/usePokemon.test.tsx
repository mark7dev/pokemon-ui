import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePokemon } from '../usePokemon';
import { pokemonApi } from '@/services/pokemonApi';
import type { Pokemon } from '@/types/pokemon';

jest.mock('@/services/pokemonApi');

const mockedPokemonApi = pokemonApi as jest.Mocked<typeof pokemonApi>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return pokemon list', async () => {
    const mockPokemon: Pokemon[] = [
      { name: 'bulbasaur', types: ['grass', 'poison'], image: '/bulbasaur.png' },
      { name: 'charmander', types: ['fire'], image: '/charmander.png' },
    ];

    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const { result } = renderHook(() => usePokemon(), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toEqual(mockPokemon);
    expect(result.current.allPokemon).toEqual(mockPokemon);
    expect(result.current.error).toBeNull();
  });

  it('should filter by search term', async () => {
    const mockPokemon: Pokemon[] = [
      { name: 'bulbasaur', types: ['grass', 'poison'], image: '/bulbasaur.png' },
      { name: 'charmander', types: ['fire'], image: '/charmander.png' },
    ];

    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const { result } = renderHook(() => usePokemon({ searchTerm: 'char' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toHaveLength(1);
    expect(result.current.pokemon[0].name).toBe('charmander');
  });

  it('should filter by selected types', async () => {
    const mockPokemon: Pokemon[] = [
      { name: 'bulbasaur', types: ['grass', 'poison'], image: '/bulbasaur.png' },
      { name: 'charmander', types: ['fire'], image: '/charmander.png' },
    ];

    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const { result } = renderHook(() => usePokemon({ selectedTypes: ['fire'] }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toHaveLength(1);
    expect(result.current.pokemon[0].name).toBe('charmander');
  });

  it('should sort pokemon by name', async () => {
    const mockPokemon: Pokemon[] = [
      { name: 'charmander', types: ['fire'], image: '/charmander.png' },
      { name: 'bulbasaur', types: ['grass', 'poison'], image: '/bulbasaur.png' },
    ];

    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const { result } = renderHook(() => usePokemon({ sortOrder: 'asc' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon[0].name).toBe('bulbasaur');
    expect(result.current.pokemon[1].name).toBe('charmander');
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch');
    mockedPokemonApi.getAll.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePokemon(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch');
    expect(result.current.pokemon).toEqual([]);
  });
});


