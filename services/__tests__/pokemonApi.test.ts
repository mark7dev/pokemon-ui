import { pokemonApi } from '../pokemonApi';
import api from '@/config/axios';
import type { Pokemon, PokemonDetail } from '@/types/pokemon';

jest.mock('@/config/axios');

const mockedApi = api as jest.Mocked<typeof api>;

describe('pokemonApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all pokemon successfully', async () => {
      const mockPokemon: Pokemon[] = [
        { name: 'bulbasaur', types: ['grass', 'poison'], image: '/bulbasaur.png' },
        { name: 'charmander', types: ['fire'], image: '/charmander.png' },
      ];

      mockedApi.get.mockResolvedValueOnce({ data: mockPokemon });

      const result = await pokemonApi.getAll();

      expect(mockedApi.get).toHaveBeenCalledWith('/pokemons');
      expect(result).toEqual(mockPokemon);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      mockedApi.get.mockRejectedValueOnce(error);

      await expect(pokemonApi.getAll()).rejects.toThrow('Network error');
      expect(mockedApi.get).toHaveBeenCalledWith('/pokemons');
    });
  });

  describe('getByName', () => {
    it('should fetch pokemon by name successfully', async () => {
      const mockPokemonDetail: PokemonDetail = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        types: ['grass', 'poison'],
        abilities: ['overgrow', 'chlorophyll'],
        images: ['/bulbasaur.png'],
        stats: {
          hp: 45,
          attack: 49,
          defense: 49,
          special_attack: 65,
          special_defense: 65,
          speed: 45,
        },
      };

      mockedApi.get.mockResolvedValueOnce({ data: mockPokemonDetail });

      const result = await pokemonApi.getByName('bulbasaur');

      expect(mockedApi.get).toHaveBeenCalledWith('/pokemons/bulbasaur');
      expect(result).toEqual(mockPokemonDetail);
    });

    it('should handle errors', async () => {
      const error = new Error('Not found');
      mockedApi.get.mockRejectedValueOnce(error);

      await expect(pokemonApi.getByName('invalid')).rejects.toThrow('Not found');
      expect(mockedApi.get).toHaveBeenCalledWith('/pokemons/invalid');
    });
  });
});




