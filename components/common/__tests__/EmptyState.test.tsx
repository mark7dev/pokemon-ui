import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('should render default message', () => {
    render(<EmptyState />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('should render custom message', () => {
    render(<EmptyState message="No Pokemon available" />);
    expect(screen.getByText('No Pokemon available')).toBeInTheDocument();
  });
});


