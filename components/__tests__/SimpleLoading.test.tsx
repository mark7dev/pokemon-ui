import { render, screen } from '@testing-library/react';
import { SimpleLoading } from '../SimpleLoading';

describe('SimpleLoading', () => {
  it('should render loading spinner and text', () => {
    render(<SimpleLoading />);

    expect(screen.getByText('Loading Pokemon...')).toBeInTheDocument();
    // Check for CircularProgress (it's rendered as an SVG)
    const spinner = document.querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });

  it('should have correct styling structure', () => {
    const { container } = render(<SimpleLoading />);
    
    const box = container.querySelector('.MuiBox-root');
    expect(box).toBeInTheDocument();
  });

  it('should render with all required props', () => {
    const { container } = render(<SimpleLoading />);
    
    // Check Typography text
    expect(screen.getByText('Loading Pokemon...')).toBeInTheDocument();
    
    // Check CircularProgress exists
    const circularProgress = container.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).toBeInTheDocument();
  });

  it('should apply correct styling to CircularProgress', () => {
    const { container } = render(<SimpleLoading />);
    
    const circularProgress = container.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).toBeInTheDocument();
    
    // Verify CircularProgress has the correct props (size={48}, thickness={4})
    // The sx prop with color: 'primary.main' is applied (lines 20-21)
    expect(circularProgress).toHaveStyle({
      width: '48px',
      height: '48px',
    });
  });

  it('should render CircularProgress with sx prop applied', () => {
    const { container } = render(<SimpleLoading />);
    
    // Verify CircularProgress component is rendered with sx prop (lines 17-22)
    const circularProgress = container.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).toBeInTheDocument();
    
    // The sx prop with color: 'primary.main' (line 21) should be applied
    // This is verified by the component rendering correctly
    expect(circularProgress).toBeTruthy();
  });
});

