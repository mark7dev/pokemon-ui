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

/**
 * Color mapping for Pokemon types
 */
export const TYPE_COLORS: Record<string, string> = {
  fire: '#FF6B6B',
  water: '#4ECDC4',
  grass: '#45B7D1',
  electric: '#FFA07A',
  psychic: '#DA70D6',
  ice: '#87CEEB',
  dragon: '#6A5ACD',
  dark: '#2F4F4F',
  fairy: '#FFB6C1',
  normal: '#D3D3D3',
  fighting: '#CD853F',
  poison: '#9370DB',
  ground: '#F4A460',
  flying: '#87CEFA',
  bug: '#9ACD32',
  rock: '#A0522D',
  ghost: '#6B46C1',
  steel: '#708090',
};

export const DEFAULT_TYPE_COLOR = '#78716C';
