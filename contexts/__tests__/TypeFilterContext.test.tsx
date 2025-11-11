import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TypeFilterProvider, useTypeFilter } from '../TypeFilterContext';
import { pokemonApi } from '@/services/pokemonApi';

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
    <QueryClientProvider client={queryClient}>
      <TypeFilterProvider>{children}</TypeFilterProvider>
    </QueryClientProvider>
  );
};

const TestComponent = () => {
  const {
    selectedTypes,
    setSelectedTypes,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    pokemonCount,
    isLoading,
  } = useTypeFilter();

  return (
    <div>
      <div data-testid="selected-types">{selectedTypes.join(',')}</div>
      <div data-testid="search-term">{searchTerm}</div>
      <div data-testid="sort-order">{sortOrder || 'null'}</div>
      <div data-testid="pokemon-count">{pokemonCount}</div>
      <div data-testid="is-loading">{isLoading ? 'true' : 'false'}</div>
      <button onClick={() => setSelectedTypes(['fire'])}>Set Types</button>
      <button onClick={() => setSearchTerm('char')}>Set Search</button>
      <button onClick={() => setSortOrder('asc')}>Set Sort</button>
    </div>
  );
};

describe('TypeFilterContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide default values', async () => {
    const mockPokemon = [
      { name: 'bulbasaur', types: ['grass'], image: '/bulbasaur.png' },
    ];
    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    render(<TestComponent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId('selected-types')).toHaveTextContent('');
      expect(screen.getByTestId('search-term')).toHaveTextContent('');
      expect(screen.getByTestId('sort-order')).toHaveTextContent('null');
    });
  });

  it('should update selected types', async () => {
    const mockPokemon = [
      { name: 'bulbasaur', types: ['grass'], image: '/bulbasaur.png' },
    ];
    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const user = userEvent.setup();
    render(<TestComponent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId('selected-types')).toHaveTextContent('');
    });

    await user.click(screen.getByText('Set Types'));

    await waitFor(() => {
      expect(screen.getByTestId('selected-types')).toHaveTextContent('fire');
    });
  });

  it('should update search term', async () => {
    const mockPokemon = [
      { name: 'bulbasaur', types: ['grass'], image: '/bulbasaur.png' },
    ];
    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const user = userEvent.setup();
    render(<TestComponent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId('search-term')).toHaveTextContent('');
    });

    await user.click(screen.getByText('Set Search'));

    await waitFor(() => {
      expect(screen.getByTestId('search-term')).toHaveTextContent('char');
    });
  });

  it('should update sort order', async () => {
    const mockPokemon = [
      { name: 'bulbasaur', types: ['grass'], image: '/bulbasaur.png' },
    ];
    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    const user = userEvent.setup();
    render(<TestComponent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId('sort-order')).toHaveTextContent('null');
    });

    await user.click(screen.getByText('Set Sort'));

    await waitFor(() => {
      expect(screen.getByTestId('sort-order')).toHaveTextContent('asc');
    });
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTypeFilter must be used within a TypeFilterProvider');

    consoleSpy.mockRestore();
  });

  it('should calculate pokemon count correctly', async () => {
    const mockPokemon = [
      { name: 'bulbasaur', types: ['grass'], image: '/bulbasaur.png' },
      { name: 'charmander', types: ['fire'], image: '/charmander.png' },
    ];
    mockedPokemonApi.getAll.mockResolvedValueOnce(mockPokemon);

    render(<TestComponent />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-count')).toHaveTextContent('2');
    });
  });
});




