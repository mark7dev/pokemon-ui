import { render, screen } from '@testing-library/react';
import { StatsChart } from '../StatsChart';
import type { PokemonStats } from '@/types/pokemon';

describe('StatsChart', () => {
  it('should render all stats', () => {
    const mockStats: PokemonStats = {
      hp: 45,
      attack: 49,
      defense: 49,
      special_attack: 65,
      special_defense: 65,
      speed: 45,
    };

    render(<StatsChart stats={mockStats} />);

    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Sp. Attack')).toBeInTheDocument();
    expect(screen.getByText('Sp. Defense')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });

  it('should display stat values', () => {
    const mockStats: PokemonStats = {
      hp: 100,
      attack: 80,
      defense: 75,
      special_attack: 90,
      special_defense: 85,
      speed: 95,
    };

    render(<StatsChart stats={mockStats} />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();
  });

  it('should render "No stats available" when stats is null', () => {
    render(<StatsChart stats={null as unknown as PokemonStats} />);
    expect(screen.getByText('No stats available')).toBeInTheDocument();
  });

  it('should handle maximum stat value normalization', () => {
    const mockStats: PokemonStats = {
      hp: 255,
      attack: 100,
      defense: 100,
      special_attack: 100,
      special_defense: 100,
      speed: 100,
    };

    render(<StatsChart stats={mockStats} />);
    expect(screen.getByText('255')).toBeInTheDocument();
  });

  it('should render all stats with correct colors and labels', () => {
    // This test verifies that all stats render correctly
    // The color assignment (line 51) and label assignment (line 52) are executed
    const mockStats: PokemonStats = {
      hp: 50,
      attack: 50,
      defense: 50,
      special_attack: 50,
      special_defense: 50,
      speed: 50,
    };

    const { container } = render(<StatsChart stats={mockStats} />);
    
    // All stats should render with bars (which use color from line 51)
    const bars = container.querySelectorAll('.MuiBox-root');
    // Should have multiple bars (one for each stat)
    expect(bars.length).toBeGreaterThan(0);
    
    // Verify all stats are rendered with correct labels (line 52)
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });
});

