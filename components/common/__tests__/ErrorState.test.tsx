import { render, screen } from '@testing-library/react';
import { ErrorState } from '../ErrorState';

describe('ErrorState', () => {
  it('should render default message', () => {
    render(<ErrorState />);
    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('should render custom message', () => {
    render(<ErrorState message="Failed to load Pokemon" />);
    expect(screen.getByText('Failed to load Pokemon')).toBeInTheDocument();
  });

  it('should render error details', () => {
    render(<ErrorState message="Error loading data" error="Network error" />);
    expect(screen.getByText(/Error loading data: Network error/i)).toBeInTheDocument();
  });
});




