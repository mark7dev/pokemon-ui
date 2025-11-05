import {
  filterBySearchTerm,
  filterByTypes,
  sortByName,
  applyFiltersAndSort,
  type SortOrder,
} from '../pokemonFilters';
import type { Pokemon } from '@/types/pokemon';

const mockPokemon: Pokemon[] = [
  { name: 'bulbasaur', types: ['grass', 'poison'], image: '/bulbasaur.png' },
  { name: 'charmander', types: ['fire'], image: '/charmander.png' },
  { name: 'squirtle', types: ['water'], image: '/squirtle.png' },
  { name: 'pikachu', types: ['electric'], image: '/pikachu.png' },
  { name: 'charizard', types: ['fire', 'flying'], image: '/charizard.png' },
];

describe('filterBySearchTerm', () => {
  it('should return all pokemon when search term is empty', () => {
    const result = filterBySearchTerm(mockPokemon, '');
    expect(result).toEqual(mockPokemon);
  });

  it('should filter pokemon by name (case insensitive)', () => {
    const result = filterBySearchTerm(mockPokemon, 'char');
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.name)).toEqual(['charmander', 'charizard']);
  });

  it('should filter pokemon by exact name match', () => {
    const result = filterBySearchTerm(mockPokemon, 'pikachu');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
  });

  it('should return empty array when no matches found', () => {
    const result = filterBySearchTerm(mockPokemon, 'nonexistent');
    expect(result).toHaveLength(0);
  });

  it('should trim whitespace from search term', () => {
    const result = filterBySearchTerm(mockPokemon, '  bulbasaur  ');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('bulbasaur');
  });
});

describe('filterByTypes', () => {
  it('should return all pokemon when no types selected', () => {
    const result = filterByTypes(mockPokemon, []);
    expect(result).toEqual(mockPokemon);
  });

  it('should filter pokemon by single type', () => {
    const result = filterByTypes(mockPokemon, ['fire']);
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.name)).toEqual(['charmander', 'charizard']);
  });

  it('should filter pokemon by multiple types (OR logic)', () => {
    const result = filterByTypes(mockPokemon, ['fire', 'water']);
    expect(result).toHaveLength(3);
    expect(result.map((p) => p.name)).toEqual(['charmander', 'squirtle', 'charizard']);
  });

  it('should be case insensitive', () => {
    const result = filterByTypes(mockPokemon, ['FIRE']);
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no matches found', () => {
    const result = filterByTypes(mockPokemon, ['dragon']);
    expect(result).toHaveLength(0);
  });
});

describe('sortByName', () => {
  it('should return original array when sortOrder is null', () => {
    const result = sortByName(mockPokemon, null);
    expect(result).toEqual(mockPokemon);
  });

  it('should sort ascending (A-Z)', () => {
    const result = sortByName(mockPokemon, 'asc');
    expect(result.map((p) => p.name)).toEqual([
      'bulbasaur',
      'charizard',
      'charmander',
      'pikachu',
      'squirtle',
    ]);
  });

  it('should sort descending (Z-A)', () => {
    const result = sortByName(mockPokemon, 'desc');
    expect(result.map((p) => p.name)).toEqual([
      'squirtle',
      'pikachu',
      'charmander',
      'charizard',
      'bulbasaur',
    ]);
  });

  it('should not mutate original array', () => {
    const original = [...mockPokemon];
    sortByName(mockPokemon, 'asc');
    expect(mockPokemon).toEqual(original);
  });
});

describe('applyFiltersAndSort', () => {
  it('should apply all filters and sorting', () => {
    const result = applyFiltersAndSort(mockPokemon, {
      selectedTypes: ['fire'],
      searchTerm: 'char',
      sortOrder: 'asc',
    });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.name)).toEqual(['charizard', 'charmander']);
  });

  it('should handle empty filters', () => {
    const result = applyFiltersAndSort(mockPokemon, {
      selectedTypes: [],
      searchTerm: '',
      sortOrder: null,
    });
    expect(result).toEqual(mockPokemon);
  });

  it('should apply only search filter', () => {
    const result = applyFiltersAndSort(mockPokemon, {
      selectedTypes: [],
      searchTerm: 'pika',
      sortOrder: null,
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
  });

  it('should apply only type filter', () => {
    const result = applyFiltersAndSort(mockPokemon, {
      selectedTypes: ['water'],
      searchTerm: '',
      sortOrder: null,
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('squirtle');
  });

  it('should apply only sort', () => {
    const result = applyFiltersAndSort(mockPokemon, {
      selectedTypes: [],
      searchTerm: '',
      sortOrder: 'desc',
    });
    expect(result.map((p) => p.name)[0]).toBe('squirtle');
  });
});


