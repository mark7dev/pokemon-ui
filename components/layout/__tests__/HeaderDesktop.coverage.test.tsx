/**
 * Test to cover HeaderDesktop line 22 by directly executing handleReset
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { HeaderDesktop } from '../HeaderDesktop';
import { TypeFilterProvider, useTypeFilter } from '@/contexts/TypeFilterContext';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import { pokemonApi } from '@/services/pokemonApi';

jest.mock('@/services/pokemonApi');
const mockedPokemonApi = pokemonApi as jest.Mocked<typeof pokemonApi>;

const mockUseRouter = jest.fn();
const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockUseRouter,
  }),
  usePathname: () => mockUsePathname(),
}));

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
      <TypeFilterProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </ThemeProvider>
      </TypeFilterProvider>
    </QueryClientProvider>
  );
};

describe('HeaderDesktop Coverage - Line 22', () => {
  const mockOnBackClick = jest.fn();
  const mockOnSortClick = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
    mockedPokemonApi.getAll.mockResolvedValue([]);

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

  it('should execute handleReset (line 22) when Remove All button is clicked', async () => {
    const TestComponent = () => {
      const { setSelectedTypes } = useTypeFilter();
      
      // Set types first to enable the button
      React.useEffect(() => {
        setSelectedTypes(['fire', 'water']);
      }, [setSelectedTypes]);

      return (
        <HeaderDesktop
          isHomePage={true}
          onBackClick={mockOnBackClick}
          onSortClick={mockOnSortClick}
        />
      );
    };

    render(<TestComponent />, { wrapper: createWrapper() });

    // Wait for types to be set and button to be enabled
    await waitFor(() => {
      const button = screen.queryByText('Remove All');
      if (button) {
        expect(button).not.toBeDisabled();
      }
    }, { timeout: 3000 });

    // Find and click the Remove All button
    const removeButton = screen.getByText('Remove All');
    expect(removeButton).not.toBeDisabled();
    
    // Click the button to execute handleReset (line 22)
    await user.click(removeButton);

    // Verify that types were cleared (handleReset executed line 22)
    await waitFor(() => {
      const buttonAfter = screen.getByText('Remove All');
      expect(buttonAfter).toBeDisabled();
    });
  });
});

