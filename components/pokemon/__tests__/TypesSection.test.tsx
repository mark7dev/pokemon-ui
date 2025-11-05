import { render, screen } from '@testing-library/react';
import { TypesSection } from '../TypesSection';

describe('TypesSection', () => {
  it('should render all types', () => {
    const types = ['fire', 'water', 'grass'];
    render(<TypesSection types={types} />);

    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
  });

  it('should render empty state when no types', () => {
    render(<TypesSection types={[]} />);
    expect(screen.getByText('Types')).toBeInTheDocument();
  });

  it('should render type chips', () => {
    render(<TypesSection types={['fire']} />);
    const chip = screen.getByText('fire');
    expect(chip).toBeInTheDocument();
  });
});

