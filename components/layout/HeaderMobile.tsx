import { Box, IconButton } from '@mui/material';
import { HeaderLogo } from './HeaderLogo';
import { HeaderActions } from './HeaderActions';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IoArrowBack } from 'react-icons/io5';

interface HeaderMobileProps {
  isHomePage: boolean;
  onLogoClick: () => void;
  onBackClick: () => void;
  onSortClick: () => void;
}

export const HeaderMobile = ({ isHomePage, onLogoClick, onBackClick, onSortClick }: HeaderMobileProps) => {
  return (
    <>
      {/* Mobile: Top row - Logo and Theme Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isHomePage && (
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
              <IoArrowBack size={20} />
            </IconButton>
          )}
          <HeaderLogo onClick={onLogoClick} width={120} height={90} maxWidth="120px" />
        </Box>
        <ThemeToggle />
      </Box>

      {isHomePage && <HeaderActions isHomePage={isHomePage} onBackClick={onBackClick} onSortClick={onSortClick} />}
    </>
  );
};

