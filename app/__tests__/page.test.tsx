import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../page';
import { TypeFilterProvider } from '@/contexts/TypeFilterContext';
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
    <QueryClientProvider client={queryClient}>
      <TypeFilterProvider>{children}</TypeFilterProvider>
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Grid component', () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: [],
      allPokemon: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />, { wrapper: createWrapper() });

    // Grid should be rendered (it will show empty state)
    expect(screen.getByText(/No Pokemon found/i)).toBeInTheDocument();
  });

  it('should pass filter context to Grid', async () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: [],
      allPokemon: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(mockedUsePokemon).toHaveBeenCalled();
    });
  });
});


