/**
 * @jest-environment node
 */

import { GET, OPTIONS } from '../route';

// Mock fetch
global.fetch = jest.fn();

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('/api/pokemons route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:4000';
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BACKEND_URL;
  });

  describe('GET', () => {
    it('should return pokemons list successfully', async () => {
      const mockPokemons = [
        { name: 'bulbasaur', types: ['grass', 'poison'] },
        { name: 'charmander', types: ['fire'] },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemons,
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockPokemons);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/pokemons',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should handle backend error response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch from backend');
      expect(data.details).toBe('Backend responded with status: 500');
    });

    it('should handle fetch error', async () => {
      const errorMessage = 'Network error';
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch from backend');
      expect(data.details).toBe(errorMessage);
    });

    it('should handle non-Error exception', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce('String error');

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch from backend');
      expect(data.details).toBe('Unknown error');
    });
  });

  describe('OPTIONS', () => {
    it('should return CORS headers', async () => {
      const response = await OPTIONS();

      expect(response.status).toBe(200);
      const headers = response.headers;
      expect(headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, PUT, DELETE, OPTIONS');
      expect(headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Authorization');
    });
  });
});

