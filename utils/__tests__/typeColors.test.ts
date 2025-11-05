import { getTypeColor } from '../typeColors';
import { TYPE_COLORS, DEFAULT_TYPE_COLOR } from '@/constants/pokemon';

describe('getTypeColor', () => {
  it('should return the correct color for a valid type', () => {
    expect(getTypeColor('fire')).toBe(TYPE_COLORS.fire);
    expect(getTypeColor('water')).toBe(TYPE_COLORS.water);
    expect(getTypeColor('grass')).toBe(TYPE_COLORS.grass);
  });

  it('should be case insensitive', () => {
    expect(getTypeColor('FIRE')).toBe(TYPE_COLORS.fire);
    expect(getTypeColor('Fire')).toBe(TYPE_COLORS.fire);
    expect(getTypeColor('FiRe')).toBe(TYPE_COLORS.fire);
  });

  it('should return default color for unknown types', () => {
    expect(getTypeColor('unknown')).toBe(DEFAULT_TYPE_COLOR);
    expect(getTypeColor('')).toBe(DEFAULT_TYPE_COLOR);
  });

  it('should handle all defined types', () => {
    const types = Object.keys(TYPE_COLORS);
    types.forEach((type) => {
      expect(getTypeColor(type)).toBe(TYPE_COLORS[type]);
    });
  });
});


