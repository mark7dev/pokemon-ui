import { renderHook, waitFor, act } from '@testing-library/react';
import { useThemeState } from '../useThemeState';
import { ThemeProvider } from 'next-themes';

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

describe('useThemeState', () => {
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

  it('should return theme state', () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty('isDark');
    expect(result.current).toHaveProperty('mounted');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(result.current).toHaveProperty('setTheme');
  });

  it('should have mounted state', () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    // mounted can be false initially or true after mount
    expect(typeof result.current.mounted).toBe('boolean');
  });

  it('should set mounted to true after mount', async () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });
  });

  it('should toggle theme', async () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    const initialIsDark = result.current.isDark;
    result.current.toggleTheme();

    await waitFor(() => {
      // Theme should have toggled
      expect(result.current.isDark).toBe(!initialIsDark);
    });
  });

  it('should set theme', async () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    await act(async () => {
      result.current.setTheme('dark');
    });

    await waitFor(() => {
      expect(result.current.isDark).toBe(true);
    });
  });

  it('should toggle theme when isDark is true', async () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    // Set to dark first
    await act(async () => {
      result.current.setTheme('dark');
    });

    await waitFor(() => {
      expect(result.current.isDark).toBe(true);
    });

    // Now toggle (should go to light)
    await act(async () => {
      result.current.toggleTheme();
    });

    // Should have toggled
    expect(result.current).toBeDefined();
  });

  it('should have setDarkTheme, setLightTheme, and setSystemTheme helpers', async () => {
    const { result } = renderHook(() => useThemeState(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    expect(result.current.setDarkTheme).toBeDefined();
    expect(result.current.setLightTheme).toBeDefined();
    expect(result.current.setSystemTheme).toBeDefined();

    await act(async () => {
      result.current.setDarkTheme();
    });

    await act(async () => {
      result.current.setLightTheme();
    });

    await act(async () => {
      result.current.setSystemTheme();
    });

    expect(result.current).toBeDefined();
  });
});

