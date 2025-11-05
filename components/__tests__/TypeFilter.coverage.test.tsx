/**
 * Test to cover TypeFilter line 30 by directly testing handleChangeLogic
 */

import { handleChangeLogic } from '../TypeFilter';

describe('TypeFilter Coverage - Line 30', () => {
  const mockOnTypesChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute line 30 with string value', () => {
    // Test line 30: typeof value === 'string' ? value.split(',') : value
    // Call handleChangeLogic directly with string value
    handleChangeLogic('fire,water,grass', mockOnTypesChange);
    
    // Verify onTypesChange was called with split array (line 30 executed)
    expect(mockOnTypesChange).toHaveBeenCalledWith(['fire', 'water', 'grass']);
  });

  it('should execute line 30 with array value', () => {
    // Test line 30: typeof value === 'string' ? value.split(',') : value
    // Call handleChangeLogic with array value (second branch)
    handleChangeLogic(['fire', 'water'], mockOnTypesChange);
    
    // Verify onTypesChange was called with array as-is (line 30 second branch)
    expect(mockOnTypesChange).toHaveBeenCalledWith(['fire', 'water']);
  });
});
