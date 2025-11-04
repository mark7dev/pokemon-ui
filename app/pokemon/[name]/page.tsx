'use client';

import { useParams } from 'next/navigation';
import { Typography, Box, Alert } from '@mui/material';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { SimpleLoading } from '@/components/SimpleLoading';

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonName = params.name as string;
  const { pokemon, loading, error } = usePokemonDetail(pokemonName);

  if (loading) {
    return <SimpleLoading />;
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          p: 4
        }}
      >
        <Alert severity="error">
          Error loading Pokemon: {error}
        </Alert>
      </Box>
    );
  }

  if (!pokemon) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          p: 4
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Pokemon not found
        </Typography>
      </Box>
    );
  }

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
        {pokemon.name}
      </Typography>
    </Box>
  );
}

