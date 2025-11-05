# Testing Documentation

This project includes a complete test suite to ensure code quality and functionality.

## Configuration

The project uses:
- **Jest** - Testing framework
- **React Testing Library** - Utilities for testing React components
- **@testing-library/user-event** - User interaction simulation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized following the project structure:

```
├── utils/__tests__/
│   ├── typeColors.test.ts
│   ├── pokemonFilters.test.ts
│   └── errorHandler.test.ts
├── services/__tests__/
│   └── pokemonApi.test.ts
├── hooks/__tests__/
│   ├── usePokemon.test.tsx
│   └── usePokemonDetail.test.tsx
├── components/__tests__/
│   ├── Card.test.tsx
│   └── Grid.test.tsx
├── components/common/__tests__/
│   ├── EmptyState.test.tsx
│   └── ErrorState.test.tsx
├── components/pokemon/__tests__/
│   ├── BasicStatCard.test.tsx
│   ├── TypesSection.test.tsx
│   ├── AbilitiesSection.test.tsx
│   └── PokemonHeader.test.tsx
└── contexts/__tests__/
    └── TypeFilterContext.test.tsx
```

## Test Coverage

### Utilities (100% coverage)
- ✅ `typeColors.ts` - Tests for type color retrieval
- ✅ `pokemonFilters.ts` - Tests for filtering and sorting
- ✅ `errorHandler.ts` - Tests for error handling

### Services (100% coverage)
- ✅ `pokemonApi.ts` - Tests for API calls

### Hooks (100% coverage)
- ✅ `usePokemon` - Tests for pokemon list hook
- ✅ `usePokemonDetail` - Tests for pokemon detail hook

### Components
- ✅ `Card` - Rendering and navigation tests
- ✅ `Grid` - State tests (loading, error, empty, success)
- ✅ `EmptyState` - Rendering tests
- ✅ `ErrorState` - Rendering tests
- ✅ `BasicStatCard` - Rendering tests
- ✅ `TypesSection` - Rendering tests
- ✅ `AbilitiesSection` - Rendering tests
- ✅ `PokemonHeader` - Rendering tests

### Contexts
- ✅ `TypeFilterContext` - State and update tests

## Statistics

- **Total Test Suites**: 15
- **Total Tests**: 71
- **All tests passing**: ✅

## Mocking

Tests use mocks for:
- `next/navigation` - Router and navigation
- `next/image` - Next.js Image component
- `@/services/pokemonApi` - API services
- `window.matchMedia` - Media queries

## Best Practices

1. **Unit tests**: Each function and component has unit tests
2. **Integration tests**: Hooks and contexts have integration tests
3. **Appropriate mocking**: Mocks are used for external dependencies
4. **Complete coverage**: Both success cases and errors are tested
5. **Descriptive names**: Tests have clear names that describe their purpose

## Test Example

```typescript
describe('getTypeColor', () => {
  it('should return the correct color for a valid type', () => {
    expect(getTypeColor('fire')).toBe(TYPE_COLORS.fire);
  });

  it('should be case insensitive', () => {
    expect(getTypeColor('FIRE')).toBe(TYPE_COLORS.fire);
  });
});
```
