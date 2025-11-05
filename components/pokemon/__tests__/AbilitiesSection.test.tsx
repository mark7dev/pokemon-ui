import { render, screen } from '@testing-library/react';
import { AbilitiesSection } from '../AbilitiesSection';

describe('AbilitiesSection', () => {
  it('should render all abilities', () => {
    const abilities = ['overgrow', 'chlorophyll'];
    render(<AbilitiesSection abilities={abilities} />);

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('overgrow')).toBeInTheDocument();
    expect(screen.getByText('chlorophyll')).toBeInTheDocument();
  });

  it('should render empty state when no abilities', () => {
    render(<AbilitiesSection abilities={[]} />);
    expect(screen.getByText('Abilities')).toBeInTheDocument();
  });

  it('should render ability chips', () => {
    render(<AbilitiesSection abilities={['overgrow']} />);
    const chip = screen.getByText('overgrow');
    expect(chip).toBeInTheDocument();
  });
});

