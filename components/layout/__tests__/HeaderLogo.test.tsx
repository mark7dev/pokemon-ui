import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeaderLogo } from '../HeaderLogo';

describe('HeaderLogo', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render logo image', () => {
    render(<HeaderLogo onClick={mockOnClick} />);
    const image = screen.getByAltText('Pokemon Logo');
    expect(image).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderLogo onClick={mockOnClick} />);

    const logo = screen.getByAltText('Pokemon Logo').closest('div');
    if (logo) {
      await user.click(logo);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });

  it('should use custom dimensions when provided', () => {
    render(<HeaderLogo onClick={mockOnClick} width={200} height={150} maxWidth="200px" />);
    const image = screen.getByAltText('Pokemon Logo');
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '150');
  });
});




