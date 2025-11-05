import { render, screen } from '@testing-library/react';
import { QueryProvider } from '../QueryProvider';
import { useQuery } from '@tanstack/react-query';

const TestComponent = () => {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => Promise.resolve('test data'),
  });

  return <div>{data || 'loading'}</div>;
};

describe('QueryProvider', () => {
  it('should render children', () => {
    render(
      <QueryProvider>
        <div>Test Content</div>
      </QueryProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide QueryClient context', () => {
    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});


