import { Box } from '@mui/material';
import { HeaderLogo } from './HeaderLogo';
import { SearchBar } from '@/components/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TypeFilter } from '@/components/TypeFilter';
import { Button, Typography, IconButton, Tooltip } from '@mui/material';
import { useTypeFilter } from '@/contexts/TypeFilterContext';
import { MdSort } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';

interface HeaderDesktopProps {
  isHomePage: boolean;
  onLogoClick: () => void;
  onBackClick: () => void;
  onSortClick: () => void;
}

export const HeaderDesktop = ({ isHomePage, onLogoClick, onBackClick, onSortClick }: HeaderDesktopProps) => {
  const { selectedTypes, setSelectedTypes, pokemonCount, isLoading, sortOrder } = useTypeFilter();

  const handleReset = () => {
    setSelectedTypes([]);
  };

  if (isHomePage) {
    return (
      <>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
          <TypeFilter 
            selectedTypes={selectedTypes} 
            onTypesChange={setSelectedTypes} 
          />
          <Button
            variant="outlined"
            size="small"
            onClick={handleReset}
            disabled={selectedTypes.length === 0}
            sx={{
              textTransform: 'none',
              minWidth: '100px'
            }}
          >
            Remove All
          </Button>
          <Typography 
            variant="body2" 
            sx={{ 
              ml: 1,
              whiteSpace: 'nowrap'
            }}
          >
            Total: {isLoading ? 'Counting...' : pokemonCount}
          </Typography>
        </Box>

        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center',
          }}
        >
          <HeaderLogo onClick={onLogoClick} width={180} height={135} maxWidth="180px" />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <SearchBar />
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
                  borderColor: 'primary.main'
                }
              }}
              aria-label="Sort by name"
            >
              <MdSort size={20} />
            </IconButton>
          </Tooltip>
          <ThemeToggle />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <IconButton
          onClick={onBackClick}
          size="small"
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          aria-label="Go back"
        >
          <IoArrowBack size={22} />
        </IconButton>
      </Box>
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center',
        }}
      >
        <HeaderLogo onClick={onLogoClick} width={180} height={135} maxWidth="180px" />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <ThemeToggle />
      </Box>
    </>
  );
};

