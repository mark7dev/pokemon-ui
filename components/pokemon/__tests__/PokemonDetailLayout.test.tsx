import { render, screen } from '@testing-library/react';
import { PokemonDetailLayout } from '../PokemonDetailLayout';
import type { PokemonDetail } from '@/types/pokemon';
import type { CardDimensions } from '@/hooks/useCardDimensions';

const mockPokemon: PokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  types: ['grass', 'poison'],
  abilities: ['overgrow', 'chlorophyll'],
  images: ['/bulbasaur.png'],
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    special_attack: 65,
    special_defense: 65,
    speed: 45,
  },
};

const mockDimensions: CardDimensions = {
  width: '150px',
  height: '100px',
  typesHeight: '100px',
  abilitiesHeight: '100px',
};

const createRef = () => ({ current: null });

describe('PokemonDetailLayout', () => {
  it('should render all basic stat cards', () => {
    render(
      <PokemonDetailLayout
        pokemon={mockPokemon}
        dimensions={mockDimensions}
        idCardRef={createRef()}
        heightCardRef={createRef()}
        baseExpCardRef={createRef()}
        weightCardRef={createRef()}
      />
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('0.7m')).toBeInTheDocument();
    expect(screen.getByText('Base Exp.')).toBeInTheDocument();
    expect(screen.getByText('64')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('6.9kg')).toBeInTheDocument();
  });

  it('should render types section', () => {
    render(
      <PokemonDetailLayout
        pokemon={mockPokemon}
        dimensions={mockDimensions}
        idCardRef={createRef()}
        heightCardRef={createRef()}
        baseExpCardRef={createRef()}
        weightCardRef={createRef()}
      />
    );

    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('should render abilities section', () => {
    render(
      <PokemonDetailLayout
        pokemon={mockPokemon}
        dimensions={mockDimensions}
        idCardRef={createRef()}
        heightCardRef={createRef()}
        baseExpCardRef={createRef()}
        weightCardRef={createRef()}
      />
    );

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('overgrow')).toBeInTheDocument();
    expect(screen.getByText('chlorophyll')).toBeInTheDocument();
  });

  it('should render stats chart when stats are available', () => {
    render(
      <PokemonDetailLayout
        pokemon={mockPokemon}
        dimensions={mockDimensions}
        idCardRef={createRef()}
        heightCardRef={createRef()}
        baseExpCardRef={createRef()}
        weightCardRef={createRef()}
      />
    );

    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
  });

  it('should render images section', () => {
    render(
      <PokemonDetailLayout
        pokemon={mockPokemon}
        dimensions={mockDimensions}
        idCardRef={createRef()}
        heightCardRef={createRef()}
        baseExpCardRef={createRef()}
        weightCardRef={createRef()}
      />
    );

    expect(screen.getByText('Images')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur image 1')).toBeInTheDocument();
  });

  it('should not render stats chart when stats are missing', () => {
    const pokemonWithoutStats = { ...mockPokemon, stats: null as unknown as typeof mockPokemon.stats };
    render(
      <PokemonDetailLayout
        pokemon={pokemonWithoutStats}
        dimensions={mockDimensions}
        idCardRef={createRef()}
        heightCardRef={createRef()}
        baseExpCardRef={createRef()}
        weightCardRef={createRef()}
      />
    );

    expect(screen.queryByText('Base Stats')).not.toBeInTheDocument();
  });
});




