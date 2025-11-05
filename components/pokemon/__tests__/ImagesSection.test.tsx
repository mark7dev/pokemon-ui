import { render, screen } from '@testing-library/react';
import { ImagesSection } from '../ImagesSection';

describe('ImagesSection', () => {
  it('should render images section with title', () => {
    const images = ['/image1.png', '/image2.png'];
    render(<ImagesSection images={images} pokemonName="bulbasaur" />);

    expect(screen.getByText('Images')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur image 1')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur image 2')).toBeInTheDocument();
  });

  it('should render nothing when images array is empty', () => {
    const { container } = render(
      <ImagesSection images={[]} pokemonName="bulbasaur" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing when images is null', () => {
    const { container } = render(
      <ImagesSection images={null as unknown as string[]} pokemonName="bulbasaur" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render images with fallback', () => {
    const images = ['/invalid-image.png'];
    render(<ImagesSection images={images} pokemonName="bulbasaur" />);

    const image = screen.getByAltText('bulbasaur image 1');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/invalid-image.png');
  });

  it('should handle image error', () => {
    const images = ['/invalid-image.png'];
    const { container } = render(<ImagesSection images={images} pokemonName="bulbasaur" />);

    const image = container.querySelector('img');
    if (image) {
      // Simulate image error
      const errorEvent = new Event('error');
      image.dispatchEvent(errorEvent);
      
      // Component should still render
      expect(screen.getByText('Images')).toBeInTheDocument();
    }
  });

  it('should handle empty image string', () => {
    const images = [''];
    render(<ImagesSection images={images} pokemonName="bulbasaur" />);

    const image = screen.getByAltText('bulbasaur image 1');
    expect(image).toBeInTheDocument();
  });

  it('should render multiple images', () => {
    const images = ['/image1.png', '/image2.png', '/image3.png'];
    render(<ImagesSection images={images} pokemonName="bulbasaur" />);

    expect(screen.getByAltText('bulbasaur image 1')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur image 2')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur image 3')).toBeInTheDocument();
  });
});

