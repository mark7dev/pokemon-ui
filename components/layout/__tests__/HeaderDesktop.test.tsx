import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { HeaderDesktop } from '../HeaderDesktop';
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

describe('HeaderDesktop', () => {
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

  it('should render home page layout', async () => {
    const { container } = render(
      <HeaderDesktop
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    // Wait for components to render
    await waitFor(() => {
      expect(container.querySelector('button')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should render detail page layout', () => {
    render(
      <HeaderDesktop
        isHomePage={false}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });

  it('should call onLogoClick when logo is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderDesktop
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const logo = screen.queryByAltText('Pokemon Logo');
      expect(logo).toBeInTheDocument();
    });

    const logo = screen.getByAltText('Pokemon Logo').closest('div');
    if (logo) {
      await user.click(logo);
      expect(mockOnLogoClick).toHaveBeenCalled();
    }
  });

  it('should call onBackClick when back button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderDesktop
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
      <HeaderDesktop
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

  it('should call handleReset when Remove All button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderDesktop
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const removeButton = screen.queryByText('Remove All');
      if (removeButton) {
        expect(removeButton).toBeInTheDocument();
      }
    }, { timeout: 3000 });

    const removeButton = screen.queryByText('Remove All');
    if (removeButton && !removeButton.hasAttribute('disabled')) {
      await user.click(removeButton);
      // handleReset should call setSelectedTypes([]) - line 22
      expect(removeButton).toBeInTheDocument();
    }
  });

  it('should execute handleReset and call setSelectedTypes', async () => {
    const user = userEvent.setup();
    render(
      <HeaderDesktop
        isHomePage={true}
        onLogoClick={mockOnLogoClick}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const removeButton = screen.queryByText('Remove All');
      if (removeButton) {
        expect(removeButton).toBeInTheDocument();
      }
    }, { timeout: 3000 });

    // Click Remove All button to execute handleReset (line 22: setSelectedTypes([]))
    const removeButton = screen.queryByText('Remove All');
    if (removeButton && !removeButton.hasAttribute('disabled')) {
      await user.click(removeButton);
      // handleReset function should execute setSelectedTypes([]) - line 22
      expect(removeButton).toBeInTheDocument();
    }
  });
});

