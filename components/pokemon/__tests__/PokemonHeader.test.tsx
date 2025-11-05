import { render, screen } from '@testing-library/react';
import { PokemonHeader } from '../PokemonHeader';
import type { PokemonDetail } from '@/types/pokemon';

const mockPokemon: PokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  types: ['grass', 'poison'],
  abilities: ['overgrow'],
  images: [],
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    special_attack: 65,
    special_defense: 65,
    speed: 45,
  },
};

describe('PokemonHeader', () => {
  it('should render pokemon name and ID', () => {
    render(<PokemonHeader pokemon={mockPokemon} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('should capitalize pokemon name', () => {
    render(<PokemonHeader pokemon={mockPokemon} />);
    const nameElement = screen.getByText('bulbasaur');
    expect(nameElement).toHaveStyle({ textTransform: 'capitalize' });
  });
});


