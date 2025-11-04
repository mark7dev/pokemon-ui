import { Box, Typography, Paper } from '@mui/material';
import { StatsChart } from '@/components/StatsChart';
import { BasicStatCard } from './BasicStatCard';
import { TypesSection } from './TypesSection';
import { AbilitiesSection } from './AbilitiesSection';
import { ImagesSection } from './ImagesSection';
import type { PokemonDetail } from '@/types/pokemon';
import type { CardDimensions } from '@/hooks/useCardDimensions';

interface PokemonDetailLayoutProps {
  pokemon: PokemonDetail;
  dimensions: CardDimensions;
  idCardRef: React.RefObject<HTMLDivElement | null>;
  heightCardRef: React.RefObject<HTMLDivElement | null>;
  baseExpCardRef: React.RefObject<HTMLDivElement | null>;
  weightCardRef: React.RefObject<HTMLDivElement | null>;
}

export const PokemonDetailLayout = ({
  pokemon,
  dimensions,
  idCardRef,
  heightCardRef,
  baseExpCardRef,
  weightCardRef,
}: PokemonDetailLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr',
          md: '0.6fr 1.3fr 0.9fr',
          lg: '0.5fr 1.5fr 0.85fr',
        },
        gap: { xs: 1, sm: 1.5, md: 2 },
        mb: { xs: 1, sm: 1.5, md: 2 },
        alignItems: { md: 'start' },
      }}
    >
      {/* Column 1: Basic Stats Cards + Types + Abilities */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, sm: 1.25 },
          maxWidth: { md: '360px', lg: '400px' },
        }}
      >
        {/* Basic Stats Cards - 2x2 Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
            },
            gridTemplateRows: {
              md: 'repeat(2, 1fr)',
            },
            gap: { xs: 1, sm: 1.25 },
          }}
        >
          <BasicStatCard
            ref={idCardRef}
            label="ID"
            value={`#${pokemon.id}`}
            cardWidth={dimensions.width}
          />
          <BasicStatCard
            ref={heightCardRef}
            label="Height"
            value={`${pokemon.height / 10}m`}
            cardWidth={dimensions.width}
          />
          <BasicStatCard
            ref={baseExpCardRef}
            label="Base Exp."
            value={pokemon.base_experience}
            cardWidth={dimensions.width}
          />
          <BasicStatCard
            ref={weightCardRef}
            label="Weight"
            value={`${pokemon.weight / 10}kg`}
            cardWidth={dimensions.width}
          />
        </Box>

        <TypesSection types={pokemon.types} />
        <AbilitiesSection abilities={pokemon.abilities} />
      </Box>

      {/* Column 2: Stats Chart */}
      {pokemon.stats && (
        <Box
          sx={{
            justifySelf: { md: 'start' },
            maxWidth: { xs: '100%', sm: '400px', md: '500px', lg: '600px' },
            width: '100%',
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            sx={{
              mb: 0.75,
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
              px: { xs: 0.5, sm: 0 },
            }}
          >
            Base Stats
          </Typography>
          <Paper
            sx={{
              p: { xs: 1, sm: 1.25, md: 1.5 },
              backgroundColor: 'background.paper',
              borderRadius: 1.5,
            }}
          >
            <StatsChart stats={pokemon.stats} />
          </Paper>
        </Box>
      )}

      {/* Column 3: Images */}
      <ImagesSection images={pokemon.images} pokemonName={pokemon.name} />
    </Box>
  );
};

