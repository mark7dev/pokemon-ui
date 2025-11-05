import { render, screen } from '@testing-library/react';
import { PokemonDetailError } from '../PokemonDetailError';

describe('PokemonDetailError', () => {
  it('should render error message', () => {
    render(<PokemonDetailError error="Failed to fetch" />);
    expect(screen.getByText(/Error loading Pokemon: Failed to fetch/i)).toBeInTheDocument();
  });

  it('should render not found message', () => {
    render(<PokemonDetailError notFound={true} />);
    expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
  });

  it('should prioritize error over notFound', () => {
    render(<PokemonDetailError error="Network error" notFound={true} />);
    expect(screen.getByText(/Error loading Pokemon: Network error/i)).toBeInTheDocument();
    expect(screen.queryByText('Pokemon not found')).not.toBeInTheDocument();
  });

  it('should render nothing when no error and not found', () => {
    const { container } = render(<PokemonDetailError error={undefined} notFound={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing when no props provided', () => {
    const { container } = render(<PokemonDetailError />);
    expect(container.firstChild).toBeNull();
  });
});

