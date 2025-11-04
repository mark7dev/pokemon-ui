import Image from 'next/image';
import { Box } from '@mui/material';

interface HeaderLogoProps {
  onClick: () => void;
  width?: number;
  height?: number;
  maxWidth?: string;
}

export const HeaderLogo = ({ 
  onClick, 
  width = 120, 
  height = 90, 
  maxWidth = '120px' 
}: HeaderLogoProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      <Image
        src="/logo.png"
        alt="Pokemon Logo"
        width={width}
        height={height}
        priority
        className="h-auto"
        style={{ maxWidth, height: 'auto' }}
      />
    </Box>
  );
};

