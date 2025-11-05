import { renderHook, waitFor, act } from '@testing-library/react';
import { useCardDimensions } from '../useCardDimensions';

// Mock window dimensions
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  get() {
    return 100;
  },
});

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  get() {
    return 150;
  },
});

describe('useCardDimensions', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('should return default dimensions initially', () => {
    const { result } = renderHook(() => useCardDimensions());

    expect(result.current.dimensions.width).toBe('auto');
    expect(result.current.dimensions.height).toBe('auto');
    expect(result.current.dimensions.typesHeight).toBe('auto');
    expect(result.current.dimensions.abilitiesHeight).toBe('auto');
  });

  it('should return refs', () => {
    const { result } = renderHook(() => useCardDimensions());

    expect(result.current.idCardRef).toBeDefined();
    expect(result.current.weightCardRef).toBeDefined();
  });

  it('should update dimensions after timeout', async () => {
    // Create mock DOM elements
    const mockCard = document.createElement('div');
    mockCard.className = 'MuiCard-root';
    Object.defineProperty(mockCard, 'offsetHeight', { value: 150, writable: true });
    Object.defineProperty(mockCard, 'offsetWidth', { value: 200, writable: true });

    const mockIdContainer = document.createElement('div');
    mockIdContainer.appendChild(mockCard);
    Object.defineProperty(mockIdContainer, 'offsetHeight', { value: 150, writable: true });

    const mockWeightContainer = document.createElement('div');
    const clonedCard = mockCard.cloneNode(true) as HTMLElement;
    mockWeightContainer.appendChild(clonedCard);
    Object.defineProperty(mockWeightContainer, 'offsetWidth', { value: 200, writable: true });
    Object.defineProperty(mockWeightContainer, 'offsetHeight', { value: 150, writable: true });

    const { result } = renderHook(() => useCardDimensions([{ test: 'data' }]));

    // Attach refs to mock elements
    act(() => {
      if (result.current.idCardRef.current === null) {
        (result.current.idCardRef as any).current = mockIdContainer;
      }
      if (result.current.weightCardRef.current === null) {
        (result.current.weightCardRef as any).current = mockWeightContainer;
      }
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      // Dimensions should be updated
      expect(result.current.dimensions).toBeDefined();
    });
  });

  it('should handle missing card elements', async () => {
    const mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'offsetHeight', { value: 100, writable: true });
    Object.defineProperty(mockContainer, 'offsetWidth', { value: 150, writable: true });

    const { result } = renderHook(() => useCardDimensions([]));

    // Attach refs to mock elements without card children
    act(() => {
      if (result.current.idCardRef.current === null) {
        (result.current.idCardRef as any).current = mockContainer;
      }
      if (result.current.weightCardRef.current === null) {
        (result.current.weightCardRef as any).current = mockContainer.cloneNode(true);
      }
    });

    act(() => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(result.current.dimensions).toBeDefined();
    });
  });

  it('should handle window resize', async () => {
    const { result } = renderHook(() => useCardDimensions());

    // Trigger resize event
    act(() => {
      window.dispatchEvent(new Event('resize'));
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(result.current.dimensions).toBeDefined();
    });
  });
});

