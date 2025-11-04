'use client';

import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Box, 
  OutlinedInput,
  SelectChangeEvent 
} from '@mui/material';
import { POKEMON_TYPES } from '@/constants/pokemon';
import { getTypeColor } from '@/utils/typeColors';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

export const TypeFilter = ({ selectedTypes, onTypesChange }: TypeFilterProps) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedTypes>) => {
    const value = event.target.value;
    onTypesChange(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDelete = (typeToDelete: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onTypesChange(selectedTypes.filter(type => type !== typeToDelete));
  };

  const handleChipClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <FormControl sx={{ minWidth: 200, maxWidth: 300 }} size="small">
      <InputLabel id="type-filter-label">Filter by Type</InputLabel>
      <Select
        labelId="type-filter-label"
        multiple
        value={selectedTypes}
        onChange={handleChange}
        input={<OutlinedInput label="Filter by Type" />}
        renderValue={(selected) => (
          <Box 
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
            onClick={handleChipClick}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                size="small"
                onDelete={handleDelete(value)}
                onClick={handleChipClick}
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: getTypeColor(value),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 20,
                  cursor: 'default',
                  '& .MuiChip-label': {
                    px: 1
                  },
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'rgba(255, 255, 255, 0.8)'
                    }
                  }
                }}
              />
            ))}
          </Box>
        )}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            minHeight: '32px !important'
          }
        }}
      >
        {POKEMON_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={type}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: getTypeColor(type),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5
                  }
                }}
              />
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeFilter;