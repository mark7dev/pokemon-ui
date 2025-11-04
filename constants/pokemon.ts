/**
 * Pokemon type constants
 */
export const POKEMON_TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'normal',
  'fighting',
  'poison',
  'ground',
  'flying',
  'bug',
  'rock',
  'ghost',
  'steel',
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

