import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePokemonDetail } from '../usePokemonDetail';
import { pokemonApi } from '@/services/pokemonApi';
import type { PokemonDetail } from '@/types/pokemon';

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

describe('usePokemonDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch pokemon detail successfully', async () => {
    const mockPokemonDetail: PokemonDetail = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: ['grass', 'poison'],
      abilities: ['overgrow', 'chlorophyll'],
      images: ['/bulbasaur.png'],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        special_attack: 65,
        special_defense: 65,
        speed: 45,
      },
    };

    mockedPokemonApi.getByName.mockResolvedValueOnce(mockPokemonDetail);

    const { result } = renderHook(() => usePokemonDetail('bulbasaur'), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toEqual(mockPokemonDetail);
    expect(result.current.error).toBeNull();
  });

  it('should not fetch when name is empty', () => {
    const { result } = renderHook(() => usePokemonDetail(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.pokemon).toBeNull();
    expect(mockedPokemonApi.getByName).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch');
    mockedPokemonApi.getByName.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePokemonDetail('invalid'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch');
    expect(result.current.pokemon).toBeNull();
  });
});




