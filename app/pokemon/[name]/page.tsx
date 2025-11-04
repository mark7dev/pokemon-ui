'use client';

import { useParams } from 'next/navigation';
import { Box } from '@mui/material';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { useCardDimensions } from '@/hooks/useCardDimensions';
import { SimpleLoading } from '@/components/SimpleLoading';
import { PokemonHeader } from '@/components/pokemon/PokemonHeader';
import { PokemonDetailLayout } from '@/components/pokemon/PokemonDetailLayout';
import { PokemonDetailError } from '@/components/pokemon/PokemonDetailError';
import { useRef } from 'react';

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonName = params.name as string;
  const { pokemon, loading, error } = usePokemonDetail(pokemonName);

  // Additional refs needed for the layout
  const heightCardRef = useRef<HTMLDivElement>(null);
  const baseExpCardRef = useRef<HTMLDivElement>(null);

  // Use the custom hook for card dimensions
  const { idCardRef, weightCardRef, dimensions } = useCardDimensions([pokemon]);

  if (loading) {
    return <SimpleLoading />;
  }

  if (error || !pokemon) {
    return <PokemonDetailError error={error || undefined} notFound={!pokemon} />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        py: { xs: 1, sm: 1.5, md: 2 },
        px: { xs: 1, sm: 1.5, md: 2 },
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <PokemonHeader pokemon={pokemon} />
        <PokemonDetailLayout
          pokemon={pokemon}
          dimensions={dimensions}
          idCardRef={idCardRef}
          heightCardRef={heightCardRef}
          baseExpCardRef={baseExpCardRef}
          weightCardRef={weightCardRef}
        />
      </Box>
    </Box>
  );
}
