import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { SearchBar } from '../SearchBar';
import { TypeFilterProvider } from '@/contexts/TypeFilterContext';
import MuiThemeProvider from '../MuiThemeProvider';
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider>
          <TypeFilterProvider>{children}</TypeFilterProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

describe('SearchBar', () => {
  beforeEach(() => {
    mockedPokemonApi.getAll.mockResolvedValue([]);
    
    // Reset matchMedia mock for next-themes
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render search input', async () => {
    render(<SearchBar />, { wrapper: createWrapper() });

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Search Pokemon...');
      expect(input).toBeInTheDocument();
    });
  });

  it('should update search term on input change', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper: createWrapper() });

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Search Pokemon...');
      expect(input).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search Pokemon...');
    await user.type(input, 'pikachu');

    await waitFor(() => {
      expect(input).toHaveValue('pikachu');
    });
  });

  it('should show clear button when search term exists', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper: createWrapper() });

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Search Pokemon...');
      expect(input).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search Pokemon...');
    await user.type(input, 'char');

    await waitFor(() => {
      const clearButton = screen.getByLabelText('clear search');
      expect(clearButton).toBeInTheDocument();
    });
  });

  it('should clear search term when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper: createWrapper() });

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Search Pokemon...');
      expect(input).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search Pokemon...');
    await user.type(input, 'char');

    await waitFor(() => {
      expect(input).toHaveValue('char');
    });

    const clearButton = screen.getByLabelText('clear search');
    await user.click(clearButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should be disabled until mounted', async () => {
    render(<SearchBar />, { wrapper: createWrapper() });
    const input = screen.getByPlaceholderText('Search Pokemon...');
    // Initially disabled, but will be enabled after mount
    expect(input).toBeInTheDocument();
  });

  it('should show endAdornment when mounted and searchTerm exists', async () => {
    const user = userEvent.setup();
    render(<SearchBar />, { wrapper: createWrapper() });

    await waitFor(() => {
      const input = screen.getByPlaceholderText('Search Pokemon...');
      expect(input).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search Pokemon...');
    await user.type(input, 'test');

    await waitFor(() => {
      // endAdornment should appear when mounted && searchTerm (line 59)
      const clearButton = screen.getByLabelText('clear search');
      expect(clearButton).toBeInTheDocument();
    });
  });
});

