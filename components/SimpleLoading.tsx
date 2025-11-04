'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

export const SimpleLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress 
        size={48} 
        thickness={4}
        sx={{ 
          color: 'primary.main',
        }} 
      />
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        Loading Pokemon...
      </Typography>
    </Box>
  );
};

export default SimpleLoading;