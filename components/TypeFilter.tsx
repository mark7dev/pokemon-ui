'use client';

import React, { useState, useRef } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Box, 
  OutlinedInput,
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import { POKEMON_TYPES } from '@/constants/pokemon';
import { getTypeColor } from '@/utils/typeColors';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

export const TypeFilter = ({ selectedTypes, onTypesChange }: TypeFilterProps) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

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
    event.preventDefault();
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    // Check if click is on the chips area (not the dropdown icon area)
    const target = event.target as HTMLElement;
    const selectElement = selectRef.current;
    
    if (selectElement && target.closest('.MuiChip-root, .MuiChip-deleteIcon')) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Check if click is in the right side (where icon should be)
    const rect = selectElement?.getBoundingClientRect();
    if (rect) {
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      // Only allow opening if click is in the right 40px (icon area)
      if (clickX < width - 40) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
  };

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <FormControl 
      sx={{ 
        minWidth: 200, 
        maxWidth: 300,
        position: 'relative'
      }} 
      size="small"
    >
      <InputLabel id="type-filter-label">Filter by Type</InputLabel>
      <Select
        ref={selectRef}
        labelId="type-filter-label"
        multiple
        value={selectedTypes}
        onChange={handleChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onClick={handleSelectClick}
        input={<OutlinedInput label="Filter by Type" />}
        renderValue={(selected) => (
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 0.5,
              width: '100%',
              pr: 4
            }}
            onClick={handleChipClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                size="small"
                onDelete={handleDelete(value)}
                onClick={handleChipClick}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: getTypeColor(value),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 20,
                  cursor: 'default',
                  pointerEvents: 'auto',
                  '& .MuiChip-label': {
                    px: 1,
                    pointerEvents: 'none'
                  },
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    '&:hover': {
                      color: 'rgba(255, 255, 255, 0.8)'
                    }
                  }
                }}
              />
            ))}
          </Box>
        )}
        IconComponent={() => null}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            minHeight: '32px !important',
            cursor: 'default',
            '&:focus': {
              cursor: 'default'
            }
          },
          '& .MuiOutlinedInput-notchedOutline': {
            cursor: 'default'
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
      <IconButton
        onClick={handleIconClick}
        size="small"
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          pointerEvents: 'auto',
          padding: '4px',
          cursor: 'pointer',
          mt: 0.5
        }}
      >
        <Box
          component="svg"
          sx={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            width: 20,
            height: 20
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </Box>
      </IconButton>
    </FormControl>
  );
};

export default TypeFilter;