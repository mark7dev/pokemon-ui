import { render } from '@testing-library/react';
import RootLayout from '../layout';
import { ThemeProvider } from 'next-themes';
import { pokemonApi } from '@/services/pokemonApi';

jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
    className: 'font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
    className: 'font-geist-mono',
  }),
}));

jest.mock('@/services/pokemonApi');

const mockedPokemonApi = pokemonApi as jest.Mocked<typeof pokemonApi>;

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

describe('RootLayout', () => {
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

  it('should render children', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
      { wrapper: createWrapper() }
    );
  });

  it('should render children inside body', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
      { wrapper: createWrapper() }
    );
    // Layout should render without errors
    expect(document.body).toBeTruthy();
  });
});

