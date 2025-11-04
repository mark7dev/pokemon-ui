import type { PokemonType } from '@/constants/pokemon';

/**
 * Color mapping for Pokemon types
 */
const TYPE_COLORS: Record<string, string> = {
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

const DEFAULT_COLOR = '#78716C';

/**
 * Get the color for a Pokemon type
 * @param type - The Pokemon type
 * @returns The color hex code for the type
 */
export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type.toLowerCase()] || DEFAULT_COLOR;
};

