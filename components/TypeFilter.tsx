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

interface TypeFilterProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

const POKEMON_TYPES = [
  'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 
  'dragon', 'dark', 'fairy', 'normal', 'fighting', 'poison', 
  'ground', 'flying', 'bug', 'rock', 'ghost', 'steel'
];

// Function to get colors based on Pokemon type
const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF6B6B',
    water: '#4ECDC4',
    grass: '#45B7D1',
    electric: '#FFA07A',
    psychic: '#DA70D6',
    ice: '#87CEEB',
    dragon: '#6A5ACD',
    dark: '#2F4F4F',
    fairy: '#FFB6C1',
    normal: '#D3D3D3',
    fighting: '#CD853F',
    poison: '#9370DB',
    ground: '#F4A460',
    flying: '#87CEFA',
    bug: '#9ACD32',
    rock: '#A0522D',
    ghost: '#6B46C1',
    steel: '#708090',
  };
  
  return typeColors[type.toLowerCase()] || '#78716C';
};

export const TypeFilter = ({ selectedTypes, onTypesChange }: TypeFilterProps) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedTypes>) => {
    const value = event.target.value;
    onTypesChange(typeof value === 'string' ? value.split(',') : value);
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: getTypeColor(value),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 20,
                  '& .MuiChip-label': {
                    px: 1
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