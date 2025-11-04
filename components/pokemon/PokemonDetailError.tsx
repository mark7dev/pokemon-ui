import { Box, Alert, Typography } from '@mui/material';

interface PokemonDetailErrorProps {
  error?: string;
  notFound?: boolean;
}

export const PokemonDetailError = ({ error, notFound }: PokemonDetailErrorProps) => {
  const errorBoxSx = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background.default',
    p: 4,
  };

  if (error) {
    return (
      <Box sx={errorBoxSx}>
        <Alert severity="error">Error loading Pokemon: {error}</Alert>
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box sx={errorBoxSx}>
        <Typography variant="h6" color="text.secondary">
          Pokemon not found
        </Typography>
      </Box>
    );
  }

  return null;
};

