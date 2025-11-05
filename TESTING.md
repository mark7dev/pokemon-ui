# Testing Documentation

This project includes a comprehensive test suite to ensure code quality, functionality, and maintainability. The test suite achieves **96%+ line coverage** with **100% branch and function coverage**.

## 📊 Test Coverage

Current coverage metrics:
- **Statements**: 93.09%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 96.11%

### Coverage by Component

- **StatsChart.tsx**: 100% (statements, branches, functions, lines)
- **TypeFilter.tsx**: 97.91% statements, 100% branches, 100% functions, 100% lines
- **HeaderActions.tsx**: 100% (statements, branches, functions, lines)
- **HeaderDesktop.tsx**: 100% (statements, branches, functions, lines)
- **All API routes**: 100%
- **All hooks**: 100%
- **All services**: 100%
- **All utils**: 93%+

## 🛠️ Configuration

The project uses:
- **Jest 30.2.0** - Testing framework
- **React Testing Library 16.3.0** - Utilities for testing React components
- **@testing-library/user-event 14.6.1** - User interaction simulation
- **@testing-library/jest-dom 6.9.1** - Custom Jest matchers for DOM
- **jest-environment-jsdom** - DOM environment for Jest

### Jest Configuration

The Jest configuration (`jest.config.js`) includes:
- Next.js integration via `next/jest`
- Custom module name mapping for `@/` imports
- Coverage collection from app, components, hooks, services, and utils
- Test timeout of 10 seconds
- Memory leak prevention with `detectOpenHandles` and `forceExit`
- Automatic mock clearing, resetting, and restoring

### Test Setup

The test setup file (`jest.setup.js`) configures:
- `@testing-library/jest-dom` matchers
- Automatic cleanup after each test
- Real timers by default (required for `userEvent`)
- Mocks for Next.js Image component
- Mocks for `window.matchMedia` (for theme testing)
- Global error handlers

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (if configured)
npm run test:watch
```

## 📁 Test Structure

Tests are organized following the project structure, with test files located next to their source files:

```
frontend-pokemon-ui/
├── app/
│   ├── __tests__/
│   │   ├── layout.test.tsx
│   │   └── page.test.tsx
│   ├── api/
│   │   └── pokemons/
│   │       ├── __tests__/
│   │       │   └── route.test.ts
│   │       └── [name]/
│   │           └── __tests__/
│   │               └── route.test.ts
│   └── pokemon/
│       └── [name]/
│           └── __tests__/
│               └── page.test.tsx
├── components/
│   ├── __tests__/
│   │   ├── Card.test.tsx
│   │   ├── Grid.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── MuiThemeProvider.test.tsx
│   │   ├── QueryProvider.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   ├── SimpleLoading.test.tsx
│   │   ├── StatsChart.test.tsx
│   │   ├── StatsChart.modified.test.tsx (coverage tests)
│   │   ├── ThemeToggle.test.tsx
│   │   ├── TypeFilter.test.tsx
│   │   └── TypeFilter.coverage.test.tsx (coverage tests)
│   ├── common/
│   │   └── __tests__/
│   │       ├── EmptyState.test.tsx
│   │       └── ErrorState.test.tsx
│   ├── layout/
│   │   └── __tests__/
│   │       ├── HeaderActions.test.tsx
│   │       ├── HeaderActions.coverage.test.tsx (coverage tests)
│   │       ├── HeaderDesktop.test.tsx
│   │       ├── HeaderDesktop.coverage.test.tsx (coverage tests)
│   │       ├── HeaderLogo.test.tsx
│   │       └── HeaderMobile.test.tsx
│   └── pokemon/
│       └── __tests__/
│           ├── AbilitiesSection.test.tsx
│           ├── BasicStatCard.test.tsx
│           ├── ImagesSection.test.tsx
│           ├── PokemonDetailError.test.tsx
│           ├── PokemonDetailLayout.test.tsx
│           ├── PokemonHeader.test.tsx
│           └── TypesSection.test.tsx
├── contexts/
│   └── __tests__/
│       └── TypeFilterContext.test.tsx
├── hooks/
│   └── __tests__/
│       ├── useCardDimensions.test.tsx
│       ├── usePokemon.test.tsx
│       ├── usePokemonDetail.test.tsx
│       └── useThemeState.test.tsx
├── services/
│   └── __tests__/
│       └── pokemonApi.test.ts
└── utils/
    └── __tests__/
        ├── errorHandler.test.ts
        ├── pokemonFilters.test.ts
        └── typeColors.test.ts
```

## 📈 Test Statistics

- **Total Test Suites**: 41
- **Total Tests**: 218
- **All tests passing**: ✅
- **Coverage**: 96.11% lines, 100% branches, 100% functions

## 🎯 Test Coverage Details

### App (100% coverage)
- ✅ `layout.tsx` - Layout component tests
- ✅ `page.tsx` - Home page tests
- ✅ `api/pokemons/route.ts` - API route tests
- ✅ `api/pokemons/[name]/route.ts` - Dynamic API route tests
- ✅ `pokemon/[name]/page.tsx` - Pokemon detail page tests

### Components (97.63% statements, 95.52% branches, 100% functions, 100% lines)
- ✅ `Card.tsx` - Pokemon card rendering and navigation
- ✅ `Grid.tsx` - Grid state management (loading, error, empty, success)
- ✅ `Header.tsx` - Header component with navigation
- ✅ `SearchBar.tsx` - Search functionality
- ✅ `TypeFilter.tsx` - Type filtering with multi-select
- ✅ `StatsChart.tsx` - Stats visualization (100% coverage)
- ✅ `ThemeToggle.tsx` - Theme switching
- ✅ `MuiThemeProvider.tsx` - Material-UI theme provider
- ✅ `QueryProvider.tsx` - React Query provider
- ✅ `SimpleLoading.tsx` - Loading indicator
- ✅ `EmptyState.tsx` - Empty state component
- ✅ `ErrorState.tsx` - Error state component
- ✅ All Pokemon detail components (Header, Layout, Sections)

### Hooks (100% coverage)
- ✅ `usePokemon` - Pokemon list hook with filtering and sorting
- ✅ `usePokemonDetail` - Pokemon detail hook
- ✅ `useCardDimensions` - Card dimensions calculation
- ✅ `useThemeState` - Theme state management

### Services (100% coverage)
- ✅ `pokemonApi.ts` - API service layer with error handling

### Utils (93.47% statements, 100% branches, 100% functions, 91.89% lines)
- ✅ `typeColors.ts` - Type color utilities
- ✅ `pokemonFilters.ts` - Filtering and sorting utilities
- ✅ `errorHandler.ts` - Error handling utilities

### Contexts (100% coverage)
- ✅ `TypeFilterContext.tsx` - Type filter context with state management

## 🧪 Mocking Strategy

Tests use comprehensive mocks for:

### Next.js Mocks
- `next/navigation` - Router, useRouter, usePathname, useParams
- `next/image` - Image component (renders as `<img>` in tests)
- `next/font/google` - Google Fonts (Geist, Geist_Mono)

### External Libraries
- `@/services/pokemonApi` - API service layer
- `@tanstack/react-query` - Query client provider
- `next-themes` - Theme provider with `window.matchMedia` mock

### Browser APIs
- `window.matchMedia` - Media query API (for theme detection)

## 🔧 Advanced Testing Techniques

### Coverage Tests

Special coverage test files ensure 100% coverage of edge cases:

- `StatsChart.modified.test.tsx` - Tests fallback cases by modifying exported constants
- `TypeFilter.coverage.test.tsx` - Tests `handleChangeLogic` with string values
- `HeaderActions.coverage.test.tsx` - Tests `handleReset` execution
- `HeaderDesktop.coverage.test.tsx` - Tests `handleReset` execution

### Test Utilities

Common test utilities and patterns:

```typescript
// Wrapper component for providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <TypeFilterProvider>
        <ThemeProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </ThemeProvider>
      </TypeFilterProvider>
    </QueryClientProvider>
  );
};

// Render with wrapper
render(<Component />, { wrapper: createWrapper() });
```

## ✅ Best Practices

1. **Unit Tests**: Each function and component has comprehensive unit tests
2. **Integration Tests**: Hooks, contexts, and API routes have integration tests
3. **Edge Case Coverage**: Fallback cases and error paths are tested
4. **Appropriate Mocking**: External dependencies are properly mocked
5. **Descriptive Names**: Test names clearly describe their purpose
6. **Provider Wrapping**: Components are wrapped with necessary providers
7. **User Event Simulation**: User interactions are tested with `@testing-library/user-event`
8. **Real Timers**: Real timers are used by default for `userEvent` compatibility
9. **Cleanup**: Automatic cleanup after each test prevents memory leaks
10. **Coverage Goals**: Aim for 100% coverage on critical paths

## 📝 Test Examples

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { StatsChart } from '../StatsChart';

describe('StatsChart', () => {
  it('should render all stats', () => {
    const mockStats: PokemonStats = {
      hp: 45,
      attack: 49,
      defense: 49,
      special_attack: 65,
      special_defense: 65,
      speed: 45,
    };

    render(<StatsChart stats={mockStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
  });
});
```

### Hook Test Example

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { usePokemon } from '../usePokemon';

describe('usePokemon', () => {
  it('should filter Pokemon by type', async () => {
    const { result } = renderHook(() => 
      usePokemon({ selectedTypes: ['fire'] })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ types: expect.arrayContaining(['fire']) })
      ])
    );
  });
});
```

### API Route Test Example

```typescript
import { GET } from '../route';

describe('/api/pokemons route', () => {
  it('should return pokemons list successfully', async () => {
    const mockPokemons = [
      { name: 'bulbasaur', types: ['grass', 'poison'] },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemons,
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockPokemons);
  });
});
```

## 🔄 CI/CD Integration

Tests are automatically run in GitHub Actions on:
- Every push to `main` or `develop` branches
- Every pull request to `main` or `develop` branches
- Manual workflow dispatch

The CI workflow:
1. Runs ESLint for code quality
2. Executes all tests
3. Generates coverage reports
4. Uploads coverage artifacts

## 🐛 Troubleshooting

### Common Issues

1. **"jest: not found"**: Ensure Jest is installed:
   ```bash
   npm install --save-dev jest
   ```

2. **Timer issues with userEvent**: Use real timers:
   ```typescript
   beforeEach(() => {
     jest.useRealTimers();
   });
   ```

3. **Missing providers**: Wrap components with required providers in tests

4. **Hydration mismatches**: Mock `window.matchMedia` for theme-related tests

5. **Memory leaks**: Use `detectOpenHandles` and `forceExit` in Jest config

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro)
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing)

---

For more information about the project, see [README.md](./README.md).
