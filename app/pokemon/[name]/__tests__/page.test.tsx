import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonDetailPage from '../page';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import type { PokemonDetail } from '@/types/pokemon';

jest.mock('next/navigation', () => ({
  useParams: () => ({ name: 'bulbasaur' }),
}));

jest.mock('@/hooks/usePokemonDetail');

const mockedUsePokemonDetail = usePokemonDetail as jest.MockedFunction<typeof usePokemonDetail>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('PokemonDetailPage', () => {
  const mockPokemon: PokemonDetail = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    types: ['grass', 'poison'],
    abilities: ['overgrow'],
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    mockedUsePokemonDetail.mockReturnValue({
      pokemon: null,
      loading: true,
      error: null,
    });

    render(<PokemonDetailPage />, { wrapper: createWrapper() });
    // Should show loading indicator
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('should render error state', () => {
    mockedUsePokemonDetail.mockReturnValue({
      pokemon: null,
      loading: false,
      error: 'Failed to fetch',
    });

    render(<PokemonDetailPage />, { wrapper: createWrapper() });
    expect(screen.getByText(/Error loading Pokemon/i)).toBeInTheDocument();
  });

  it('should render pokemon detail when loaded', async () => {
    mockedUsePokemonDetail.mockReturnValue({
      pokemon: mockPokemon,
      loading: false,
      error: null,
    });

    render(<PokemonDetailPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('should render not found when pokemon is null', () => {
    mockedUsePokemonDetail.mockReturnValue({
      pokemon: null,
      loading: false,
      error: null,
    });

    render(<PokemonDetailPage />, { wrapper: createWrapper() });
    expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
  });
});


