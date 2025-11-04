import { Box } from '@mui/material';
import { SearchBar } from '@/components/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TypeFilter } from '@/components/TypeFilter';
import { Button, Typography, IconButton, Tooltip } from '@mui/material';
import { useTypeFilter } from '@/contexts/TypeFilterContext';
import { IoArrowBack } from 'react-icons/io5';
import { MdSort } from 'react-icons/md';

interface HeaderActionsProps {
  isHomePage: boolean;
  onBackClick: () => void;
  onSortClick: () => void;
}

export const HeaderActions = ({ isHomePage, onBackClick, onSortClick }: HeaderActionsProps) => {
  const { selectedTypes, setSelectedTypes, pokemonCount, isLoading, sortOrder } = useTypeFilter();

  const handleReset = () => {
    setSelectedTypes([]);
  };

  if (!isHomePage) {
    return null;
  }

  return (
    <>
      {/* Mobile: Middle row - Search Bar */}
      <Box sx={{ width: '100%', display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <SearchBar />
        </Box>
        <Tooltip title={sortOrder === 'asc' ? 'Sort A-Z' : sortOrder === 'desc' ? 'Sort Z-A' : 'Sort by Name'}>
          <IconButton
            onClick={onSortClick}
            size="small"
            sx={{
              color: sortOrder ? 'primary.main' : 'text.secondary',
              border: 1,
              borderColor: sortOrder ? 'primary.main' : 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'primary.main',
              },
            }}
            aria-label="Sort by name"
          >
            <MdSort size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Mobile: Bottom row - Filter, Button, Total */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1, minWidth: '150px' }}>
          <TypeFilter 
            selectedTypes={selectedTypes} 
            onTypesChange={setSelectedTypes} 
          />
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
          disabled={selectedTypes.length === 0}
          sx={{
            textTransform: 'none',
            minWidth: { xs: '80px', sm: '100px' },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Remove All
        </Button>
        <Typography 
          variant="body2" 
          sx={{ 
            whiteSpace: 'nowrap',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Total: {isLoading ? 'Counting...' : pokemonCount}
        </Typography>
      </Box>
    </>
  );
};

