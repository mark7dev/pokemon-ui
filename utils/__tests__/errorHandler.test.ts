import { getErrorMessage, POKEMON_ERROR_MESSAGES } from '../errorHandler';

describe('getErrorMessage', () => {
  it('should extract message from Error instance', () => {
    const error = new Error('Test error message');
    expect(getErrorMessage(error)).toBe('Test error message');
  });

  it('should return string directly if error is a string', () => {
    expect(getErrorMessage('String error')).toBe('String error');
  });

  it('should return default message for unknown error types', () => {
    expect(getErrorMessage(null)).toBe('An unknown error occurred');
    expect(getErrorMessage(undefined)).toBe('An unknown error occurred');
    expect(getErrorMessage(123)).toBe('An unknown error occurred');
    expect(getErrorMessage({})).toBe('An unknown error occurred');
  });

  it('should handle Error objects with custom properties', () => {
    const error = new Error('Custom error');
    error.name = 'CustomError';
    expect(getErrorMessage(error)).toBe('Custom error');
  });
});

describe('POKEMON_ERROR_MESSAGES', () => {
  it('should have all required error messages', () => {
    expect(POKEMON_ERROR_MESSAGES.FETCH_ALL).toBe('Failed to fetch Pokemon');
    expect(POKEMON_ERROR_MESSAGES.FETCH_DETAIL).toBe('Failed to fetch Pokemon details');
    expect(POKEMON_ERROR_MESSAGES.NOT_FOUND).toBe('Pokemon not found');
  });
});


