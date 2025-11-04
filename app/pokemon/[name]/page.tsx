'use client';

import { useParams } from 'next/navigation';
import { Typography, Box } from '@mui/material';

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonName = params.name as string;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        color: 'text.primary',
        p: 4
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textTransform: 'capitalize',
          fontWeight: 600
        }}
      >
        {pokemonName}
      </Typography>
    </Box>
  );
}

