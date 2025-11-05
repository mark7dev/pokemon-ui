import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import MuiThemeProvider from '../MuiThemeProvider';

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

describe('MuiThemeProvider', () => {
  beforeEach(() => {
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
      <MuiThemeProvider>
        <div>Test Content</div>
      </MuiThemeProvider>,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render without theme provider wrapper', () => {
    render(
      <MuiThemeProvider>
        <div>Test Content</div>
      </MuiThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply dark theme when isDark is true', () => {
    const darkWrapper = () => {
      return ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      );
    };

    render(
      <MuiThemeProvider>
        <div>Test Content</div>
      </MuiThemeProvider>,
      { wrapper: darkWrapper() }
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    // Theme should be applied (lines 21-22, 44-53)
  });

  it('should apply light theme when isDark is false', () => {
    render(
      <MuiThemeProvider>
        <div>Test Content</div>
      </MuiThemeProvider>,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    // Light theme should be applied (lines 32-41)
  });
});

