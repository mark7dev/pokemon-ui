/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};

/**
 * Default error message for Pokemon-related errors
 */
export const POKEMON_ERROR_MESSAGES = {
  FETCH_ALL: 'Failed to fetch Pokemon',
  FETCH_DETAIL: 'Failed to fetch Pokemon details',
  NOT_FOUND: 'Pokemon not found',
} as const;

