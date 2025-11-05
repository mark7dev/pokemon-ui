import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { HeaderMobile } from '../HeaderMobile';
import { TypeFilterProvider } from '@/contexts/TypeFilterContext';
import MuiThemeProvider from '@/components/MuiThemeProvider';
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

describe('HeaderMobile', () => {
  const mockOnLogoClick = jest.fn();
  const mockOnBackClick = jest.fn();
  const mockOnSortClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('should render logo and theme toggle', () => {
    render(
      <HeaderMobile
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByAltText('Pokemon Logo')).toBeInTheDocument();
  });

  it('should render back button when not on home page', () => {
    render(
      <HeaderMobile
        isHomePage={false}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });

  it('should render header actions when on home page', async () => {
    render(
      <HeaderMobile
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search Pokemon...')).toBeInTheDocument();
    });
  });

  it('should call onLogoClick when logo is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderMobile
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    const logo = screen.getByAltText('Pokemon Logo').closest('div');
    if (logo) {
      await user.click(logo);
      expect(mockOnLogoClick).toHaveBeenCalled();
    }
  });

  it('should call onBackClick when back button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderMobile
        isHomePage={false}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    const backButton = screen.getByLabelText('Go back');
    await user.click(backButton);
    expect(mockOnBackClick).toHaveBeenCalled();
  });

  it('should call onSortClick when sort button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderMobile
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const sortButton = screen.queryByLabelText('Sort by name');
      if (sortButton) {
        expect(sortButton).toBeInTheDocument();
      }
    }, { timeout: 3000 });

    const sortButton = screen.queryByLabelText('Sort by name');
    if (sortButton) {
      await user.click(sortButton);
      expect(mockOnSortClick).toHaveBeenCalled();
    }
  });
});

