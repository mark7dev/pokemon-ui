import { render, screen } from '@testing-library/react';
import { BasicStatCard } from '../BasicStatCard';

describe('BasicStatCard', () => {
  it('should render label and value', () => {
    render(<BasicStatCard label="Height" value="1.7m" />);
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('1.7m')).toBeInTheDocument();
  });

  it('should render numeric value', () => {
    render(<BasicStatCard label="ID" value={123} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should render React node as value', () => {
    render(
      <BasicStatCard
        label="Weight"
        value={<span data-testid="custom-value">69kg</span>}
      />
    );
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
  });
});




