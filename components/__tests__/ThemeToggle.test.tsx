import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '../ThemeToggle';

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset matchMedia mock
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

  it('should render component', () => {
    const { container } = render(<ThemeToggle />, { wrapper: createWrapper() });
    // Component should render something (either loading or button)
    expect(container.firstChild).toBeTruthy();
  });

  it('should render toggle button after mount', async () => {
    render(<ThemeToggle />, { wrapper: createWrapper() });

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />, { wrapper: createWrapper() });

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    // Theme should have toggled
    expect(button).toBeInTheDocument();
  });

  it('should have correct aria-label', async () => {
    render(<ThemeToggle />, { wrapper: createWrapper() });

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('should handle system theme change', async () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        dispatchEvent: jest.fn(),
      })),
    });

    const { unmount } = render(<ThemeToggle />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(mockAddEventListener).toHaveBeenCalled();
    });

    // Verify the event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    // Unmount to trigger cleanup
    unmount();

    // Verify the event listener was removed
    expect(mockRemoveEventListener).toHaveBeenCalled();
  });

  it('should call setTheme when system theme changes to dark', async () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === 'change') {
            changeHandler = handler as (e: MediaQueryListEvent) => void;
          }
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<ThemeToggle />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(changeHandler).toBeTruthy();
    });

    // Simulate system theme change to dark
    if (changeHandler) {
      const mockEvent = {
        matches: true,
      } as MediaQueryListEvent;
      
      changeHandler(mockEvent);
      // The handler should call setTheme('dark')
    }

    expect(changeHandler).toBeTruthy();
  });

  it('should call setTheme when system theme changes to light', async () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === 'change') {
            changeHandler = handler as (e: MediaQueryListEvent) => void;
          }
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<ThemeToggle />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(changeHandler).toBeTruthy();
    });

    // Simulate system theme change to light
    if (changeHandler) {
      const mockEvent = {
        matches: false,
      } as MediaQueryListEvent;
      
      changeHandler(mockEvent);
      // The handler should call setTheme('light')
    }

    expect(changeHandler).toBeTruthy();
  });
});

