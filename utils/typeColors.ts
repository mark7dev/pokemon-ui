import { TYPE_COLORS, DEFAULT_TYPE_COLOR } from '@/constants/pokemon';

/**
 * Get the color for a Pokemon type
 * @param type - The Pokemon type
 * @returns The color hex code for the type
 */
export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type.toLowerCase()] || DEFAULT_TYPE_COLOR;
};

