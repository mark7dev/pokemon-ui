import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Grid } from '../Grid';
import { usePokemon } from '@/hooks/usePokemon';

jest.mock('@/hooks/usePokemon');

const mockedUsePokemon = usePokemon as jest.MockedFunction<typeof usePokemon>;

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

describe('Grid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: [],
      allPokemon: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { container } = render(
      <Grid selectedTypes={[]} searchTerm="" sortOrder={null} />,
      { wrapper: createWrapper() }
    );

    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });

  it('should render error state', () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: [],
      allPokemon: [],
      loading: false,
      error: 'Failed to fetch',
      refetch: jest.fn(),
    });

    render(<Grid selectedTypes={[]} searchTerm="" sortOrder={null} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText(/Error loading Pokemon/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  it('should render empty state', () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: [],
      allPokemon: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Grid selectedTypes={[]} searchTerm="" sortOrder={null} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText(/No Pokemon found/i)).toBeInTheDocument();
  });

  it('should render pokemon cards', () => {
    const mockPokemon = [
      { name: 'bulbasaur', types: ['grass'], image: '/bulbasaur.png' },
      { name: 'charmander', types: ['fire'], image: '/charmander.png' },
    ];

    mockedUsePokemon.mockReturnValue({
      pokemon: mockPokemon,
      allPokemon: mockPokemon,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Grid selectedTypes={[]} searchTerm="" sortOrder={null} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('should pass correct props to usePokemon', () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: [],
      allPokemon: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(
      <Grid selectedTypes={['fire']} searchTerm="char" sortOrder="asc" />,
      { wrapper: createWrapper() }
    );

    expect(mockedUsePokemon).toHaveBeenCalledWith({
      selectedTypes: ['fire'],
      searchTerm: 'char',
      sortOrder: 'asc',
    });
  });
});




