'use client';

import { useParams } from 'next/navigation';
import { Typography, Box, Alert, Card, CardContent, Chip, Paper } from '@mui/material';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { SimpleLoading } from '@/components/SimpleLoading';
import { getTypeColor } from '@/utils/typeColors';
import { StatsChart } from '@/components/StatsChart';
import Image from 'next/image';

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
        backgroundColor: 'background.default',
        color: 'text.primary',
        p: { xs: 2, sm: 4, md: 6 }
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header with Name */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              textTransform: 'capitalize',
              fontWeight: 700,
              mb: 1
            }}
          >
            {pokemon.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            #{pokemon.id}
          </Typography>
        </Box>

        {/* Main Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3,
            mb: 4
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Height
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {pokemon.height / 10}m
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Weight
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {pokemon.weight / 10}kg
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Base Experience
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {pokemon.base_experience}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ID
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                #{pokemon.id}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Types and Abilities - Very Visible */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)'
            },
            gap: 3,
            mb: 4
          }}
        >
          <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              Types
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: getTypeColor(type),
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    height: 36,
                    px: 2,
                    '& .MuiChip-label': {
                      px: 2
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>
          <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              Abilities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {pokemon.abilities.map((ability) => (
                <Chip
                  key={ability}
                  label={ability}
                  sx={{
                    textTransform: 'capitalize',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    height: 36,
                    px: 2,
                    '& .MuiChip-label': {
                      px: 2
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Stats Chart */}
        {pokemon.stats && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
              Base Stats
            </Typography>
            <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
              <StatsChart stats={pokemon.stats} />
            </Paper>
          </Box>
        )}

        {/* Images Grid */}
        {pokemon.images && pokemon.images.length > 0 && (
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
              Images
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)'
                },
                gap: 3
              }}
            >
              {pokemon.images.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 300,
                      backgroundColor: 'grey.50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    <Image
                      src={image || '/no-image.svg'}
                      alt={`${pokemon.name} image ${index + 1}`}
                      fill
                      style={{
                        objectFit: 'contain',
                        padding: '16px'
                      }}
                      unoptimized
                      onError={(e) => {
                        console.error('Image failed to load:', image);
                        e.currentTarget.src = '/no-image.svg';
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

