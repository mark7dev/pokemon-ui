'use client';

import React, { useId } from 'react';
import { TextField, InputAdornment, Box, IconButton } from '@mui/material';
import { useTypeFilter } from '@/contexts/TypeFilterContext';

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useTypeFilter();
  const searchId = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <TextField
      id={searchId}
      variant="outlined"
      placeholder="Search Pokemon..."
      value={searchTerm}
      onChange={handleChange}
      size="small"
      fullWidth
      sx={{
        minWidth: { xs: '100%', md: 200 },
        maxWidth: { xs: '100%', md: 300 },
        width: { xs: '100%', md: 'auto' },
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        }
      }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="svg"
                sx={{
                  width: 20,
                  height: 20,
                  color: 'action.active'
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </Box>
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                edge="end"
                aria-label="clear search"
                sx={{ padding: '4px' }}
              >
                <Box
                  component="svg"
                  sx={{
                    width: 18,
                    height: 18
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Box>
              </IconButton>
            </InputAdornment>
          ),
        }}
    />
  );
};

export default SearchBar;

