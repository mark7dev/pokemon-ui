// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Track open handles for cleanup
const openHandles = new Set();

// Cleanup after each test
afterEach(() => {
  cleanup();
  
  // Clear all mock calls
  jest.clearAllMocks();
  
  // Clean up any open handles
  openHandles.forEach(handle => {
    if (typeof handle === 'function') {
      handle();
    }
  });
  openHandles.clear();
});

// Use real timers by default (userEvent needs real timers)
// Individual tests can use fake timers if needed
beforeEach(() => {
  jest.useRealTimers();
});

// Cleanup after all tests
afterAll(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useParams() {
    return { name: 'bulbasaur' };
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Filter out Next.js specific props that are not valid for <img> elements
    const { priority, unoptimized, ...imgProps } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    const mediaQuery = {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
    
    // Track this media query for cleanup
    openHandles.add(() => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', mediaQuery.onchange);
      }
    });
    
    return mediaQuery;
  }),
});

// Mock XMLHttpRequest to prevent hanging requests
const originalXMLHttpRequest = global.XMLHttpRequest;

class MockXMLHttpRequest {
  constructor() {
    this.readyState = 0;
    this.status = 200;
    this.statusText = 'OK';
    this.responseText = '';
    this.response = '';
    this.headers = new Map();
    
    // Track this request for cleanup
    openHandles.add(() => {
      if (this.abort) {
        this.abort();
      }
    });
  }

  open() {
    this.readyState = 1;
  }

  send() {
    this.readyState = 4;
    setTimeout(() => {
      if (this.onreadystatechange) {
        this.onreadystatechange();
      }
    }, 0);
  }

  abort() {
    this.readyState = 0;
  }

  setRequestHeader() {}

  getResponseHeader() {
    return null;
  }

  getAllResponseHeaders() {
    return '';
  }
}

global.XMLHttpRequest = MockXMLHttpRequest;

// Restore original XMLHttpRequest after all tests
afterAll(() => {
  global.XMLHttpRequest = originalXMLHttpRequest;
});


