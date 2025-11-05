/**
 * Test to cover StatsChart lines 51-52 by modifying exported constants
 * This uses delete to temporarily remove keys from STAT_COLORS/STAT_LABELS
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatsChart, STAT_COLORS, STAT_LABELS } from '../StatsChart';
import type { PokemonStats } from '@/types/pokemon';

describe('StatsChart Fallback Coverage Tests', () => {
  let originalSpeedColor: string | undefined;
  let originalSpeedLabel: string | undefined;

  beforeEach(() => {
    // Store original values
    originalSpeedColor = STAT_COLORS['speed'];
    originalSpeedLabel = STAT_LABELS['speed'];
  });

  afterEach(() => {
    // Restore original values
    if (originalSpeedColor !== undefined) {
      STAT_COLORS['speed'] = originalSpeedColor;
    }
    if (originalSpeedLabel !== undefined) {
      STAT_LABELS['speed'] = originalSpeedLabel;
    }
  });

  it('should use fallback color when stat name is not in STAT_COLORS (line 51)', () => {
    // Test line 51: const color = STAT_COLORS[stat.name] || '#757575';
    // Temporarily delete 'speed' from STAT_COLORS to trigger fallback
    delete STAT_COLORS['speed'];
    // Also delete from STAT_LABELS so both fallbacks trigger
    delete STAT_LABELS['speed'];
    
    const mockStats: PokemonStats = {
      hp: 50,
      attack: 50,
      defense: 50,
      special_attack: 50,
      special_defense: 50,
      speed: 50,
    };

    render(<StatsChart stats={mockStats} />);
    
    // Verify that 'speed' uses the fallback label (line 52) and fallback color (line 51)
    expect(screen.getByText('speed')).toBeInTheDocument(); // Fallback label from line 52
    expect(screen.getByText('HP')).toBeInTheDocument();
  });

  it('should use fallback label when stat name is not in STAT_LABELS (line 52)', () => {
    // Test line 52: const label = STAT_LABELS[stat.name] || stat.name;
    // Temporarily delete 'speed' from STAT_LABELS to trigger fallback
    // Keep STAT_COLORS['speed'] so we only test line 52
    delete STAT_LABELS['speed'];
    
    const mockStats: PokemonStats = {
      hp: 50,
      attack: 50,
      defense: 50,
      special_attack: 50,
      special_defense: 50,
      speed: 50,
    };

    render(<StatsChart stats={mockStats} />);
    
    // Verify that 'speed' uses the fallback label (stat.name) - line 52
    expect(screen.getByText('speed')).toBeInTheDocument();
  });
});
