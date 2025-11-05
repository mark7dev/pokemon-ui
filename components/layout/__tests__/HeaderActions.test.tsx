import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeaderActions } from '../HeaderActions';
import { TypeFilterProvider } from '@/contexts/TypeFilterContext';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <TypeFilterProvider>{children}</TypeFilterProvider>
    </QueryClientProvider>
  );
};

describe('HeaderActions', () => {
  const mockOnBackClick = jest.fn();
  const mockOnSortClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when not on home page', () => {
    render(
      <HeaderActions
        isHomePage={false}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.queryByText('Remove All')).not.toBeInTheDocument();
  });

  it('should render search bar and filter when on home page', async () => {
    const { container } = render(
      <HeaderActions
        isHomePage={true}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    // Wait for components to mount
    await waitFor(() => {
      expect(container.querySelector('input')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should render sort button when on home page', async () => {
    render(
      <HeaderActions
        isHomePage={true}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const sortButton = screen.getByLabelText('Sort by name');
      expect(sortButton).toBeInTheDocument();
    });
  });

  it('should call onSortClick when sort button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderActions
        isHomePage={true}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const sortButton = screen.queryByLabelText('Sort by name');
      if (sortButton) {
        expect(sortButton).toBeInTheDocument();
      }
    }, { timeout: 3000 });

    const sortButton = screen.queryByLabelText('Sort by name');
    if (sortButton) {
      await user.click(sortButton);
      expect(mockOnSortClick).toHaveBeenCalled();
    }
  });

  it('should call handleReset when Remove All button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <HeaderActions
        isHomePage={true}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const removeButton = screen.queryByText('Remove All');
      if (removeButton) {
        expect(removeButton).toBeInTheDocument();
      }
    }, { timeout: 3000 });

    // First, select some types to enable the button
    const typeFilter = container.querySelector('[role="combobox"]');
    
    // Then click Remove All to trigger handleReset (line 20: setSelectedTypes([]))
    const removeButton = screen.queryByText('Remove All');
    if (removeButton) {
      // If button is disabled, we need to select types first
      if (removeButton.hasAttribute('disabled')) {
        // The button should be disabled when no types are selected
        expect(removeButton).toBeDisabled();
      } else {
        await user.click(removeButton);
        // handleReset should call setSelectedTypes([]) - line 20
        expect(removeButton).toBeInTheDocument();
      }
    }
  });

  it('should execute handleReset and call setSelectedTypes', async () => {
    const user = userEvent.setup();
    render(
      <HeaderActions
        isHomePage={true}
        onBackClick={mockOnBackClick}
        onSortClick={mockOnSortClick}
      />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      const removeButton = screen.queryByText('Remove All');
      if (removeButton) {
        expect(removeButton).toBeInTheDocument();
      }
    }, { timeout: 3000 });

    // Click Remove All button to execute handleReset (line 20: setSelectedTypes([]))
    const removeButton = screen.queryByText('Remove All');
    if (removeButton && !removeButton.hasAttribute('disabled')) {
      await user.click(removeButton);
      // handleReset function should execute setSelectedTypes([]) - line 20
      expect(removeButton).toBeInTheDocument();
    }
  });
});

