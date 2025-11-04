import { Typography, Box } from '@mui/material';
import type { PokemonDetail } from '@/types/pokemon';

interface PokemonHeaderProps {
  pokemon: PokemonDetail;
}

export const PokemonHeader = ({ pokemon }: PokemonHeaderProps) => {
  return (
    <Box
      sx={{
        mb: { xs: 1.5, sm: 2 },
        textAlign: 'center',
        px: { xs: 0.5, sm: 0 },
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textTransform: 'capitalize',
          fontWeight: 700,
          mb: 0.25,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
        }}
      >
        {pokemon.name}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}
      >
        #{pokemon.id}
      </Typography>
    </Box>
  );
};

