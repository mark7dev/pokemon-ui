/**
 * @jest-environment node
 */

import { GET, OPTIONS } from '../route';
import { NextRequest } from 'next/server';

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

describe('/api/pokemons/[name] route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:4000';
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BACKEND_URL;
  });

  describe('GET', () => {
    it('should return pokemon detail successfully', async () => {
      const mockPokemon = {
        name: 'bulbasaur',
        types: ['grass', 'poison'],
        stats: { hp: 45, attack: 49 },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      });

      const request = new NextRequest('http://localhost:3000/api/pokemons/bulbasaur');
      const params = Promise.resolve({ name: 'bulbasaur' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockPokemon);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/pokemons/bulbasaur',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should return 400 when pokemon name is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/pokemons/');
      const params = Promise.resolve({ name: '' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid Pokemon name');
      expect(data.details).toBe('Pokemon name is required');
    });

    it('should return 400 when pokemon name is not a string', async () => {
      const request = new NextRequest('http://localhost:3000/api/pokemons/123');
      const params = Promise.resolve({ name: null as unknown as string });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid Pokemon name');
    });

    it('should return 404 when pokemon is not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'Not Found',
      });

      const request = new NextRequest('http://localhost:3000/api/pokemons/invalid');
      const params = Promise.resolve({ name: 'invalid' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Pokemon not found');
      expect(data.details).toBe('Pokemon with name "invalid" not found');
    });

    it('should handle backend error response (non-404)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      });

      const request = new NextRequest('http://localhost:3000/api/pokemons/bulbasaur');
      const params = Promise.resolve({ name: 'bulbasaur' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch pokemon from backend');
      expect(data.details).toBe('Backend responded with status: 500');
    });

    it('should handle fetch error', async () => {
      const errorMessage = 'Network error';
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      const request = new NextRequest('http://localhost:3000/api/pokemons/bulbasaur');
      const params = Promise.resolve({ name: 'bulbasaur' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch pokemon from backend');
      expect(data.details).toBe(errorMessage);
    });

    it('should handle non-Error exception', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce('String error');

      const request = new NextRequest('http://localhost:3000/api/pokemons/bulbasaur');
      const params = Promise.resolve({ name: 'bulbasaur' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch pokemon from backend');
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

