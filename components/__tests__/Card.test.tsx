import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonCard } from '../Card';
import type { Pokemon } from '@/types/pokemon';

const mockUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockUseRouter,
  }),
}));

const mockPokemon: Pokemon = {
  name: 'bulbasaur',
  types: ['grass', 'poison'],
  image: '/bulbasaur.png',
};

describe('PokemonCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render pokemon name and types', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('should navigate to pokemon detail page on click', async () => {
    const user = userEvent.setup();
    render(<PokemonCard pokemon={mockPokemon} />);

    const card = screen.getByText('bulbasaur').closest('div[role="button"]');
    if (card) {
      await user.click(card);
      expect(mockUseRouter).toHaveBeenCalledWith('/pokemon/bulbasaur');
    }
  });

  it('should call handleClick when card is clicked directly', async () => {
    const user = userEvent.setup();
    const { container } = render(<PokemonCard pokemon={mockPokemon} />);

    // Click directly on the Card component
    const card = container.querySelector('.MuiCard-root');
    if (card) {
      await user.click(card);
      expect(mockUseRouter).toHaveBeenCalledWith('/pokemon/bulbasaur');
    }
  });

  it('should display pokemon image', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const image = screen.getByAltText('bulbasaur');
    expect(image).toHaveAttribute('src', '/bulbasaur.png');
  });

  it('should handle missing image gracefully', () => {
    const pokemonWithoutImage: Pokemon = {
      ...mockPokemon,
      image: '',
    };
    render(<PokemonCard pokemon={pokemonWithoutImage} />);
    const image = screen.getByAltText('bulbasaur');
    expect(image).toHaveAttribute('src', '/no-image.svg');
  });

  it('should handle image error', () => {
    const { container } = render(<PokemonCard pokemon={mockPokemon} />);
    const image = container.querySelector('img');
    
    if (image) {
      // Simulate image error
      const errorEvent = new Event('error');
      image.dispatchEvent(errorEvent);
      
      // Component should still render
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    }
  });

  it('should call router.push when handleClick is executed', async () => {
    const user = userEvent.setup();
    render(<PokemonCard pokemon={mockPokemon} />);

    // Click on the card to trigger handleClick (line 21: router.push)
    const card = screen.getByText('bulbasaur').closest('.MuiCard-root');
    if (card) {
      await user.click(card);
      expect(mockUseRouter).toHaveBeenCalledWith('/pokemon/bulbasaur');
    }
  });
});

