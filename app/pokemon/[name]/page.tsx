'use client';

import { useParams } from 'next/navigation';
import { Typography, Box, Alert, Card, CardContent, Chip, Paper } from '@mui/material';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { SimpleLoading } from '@/components/SimpleLoading';
import { getTypeColor } from '@/utils/typeColors';
import { StatsChart } from '@/components/StatsChart';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonName = params.name as string;
  const { pokemon, loading, error } = usePokemonDetail(pokemonName);
  const heightCardRef = useRef<HTMLDivElement>(null);
  const weightCardRef = useRef<HTMLDivElement>(null);
  const typesCardRef = useRef<HTMLDivElement>(null);
  const abilitiesCardRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);
  const baseExpCardRef = useRef<HTMLDivElement>(null);
  const [typesHeight, setTypesHeight] = useState<string>('auto');
  const [abilitiesHeight, setAbilitiesHeight] = useState<string>('auto');
  const [cardWidth, setCardWidth] = useState<string>('auto');
  const [cardHeight, setCardHeight] = useState<string>('auto');

  useEffect(() => {
    const updateHeights = () => {
      if (idCardRef.current) {
        const cardElement = idCardRef.current.querySelector('.MuiCard-root') as HTMLElement;
        if (cardElement) {
          setTypesHeight(`${cardElement.offsetHeight}px`);
        } else {
          setTypesHeight(`${idCardRef.current.offsetHeight}px`);
        }
      }
      if (weightCardRef.current) {
        const cardElement = weightCardRef.current.querySelector('.MuiCard-root') as HTMLElement;
        if (cardElement) {
          setAbilitiesHeight(`${cardElement.offsetHeight}px`);
          // Use Weight card dimensions for all basic stats cards
          setCardWidth(`${weightCardRef.current.offsetWidth}px`);
          setCardHeight(`${cardElement.offsetHeight}px`);
        } else {
          setAbilitiesHeight(`${weightCardRef.current.offsetHeight}px`);
          setCardWidth(`${weightCardRef.current.offsetWidth}px`);
          setCardHeight(`${weightCardRef.current.offsetHeight}px`);
        }
      }
    };

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      updateHeights();
    }, 100);

    // Update on window resize
    window.addEventListener('resize', updateHeights);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateHeights);
    };
  }, [pokemon]);

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
        py: { xs: 1, sm: 1.5, md: 2 },
        px: { xs: 1, sm: 1.5, md: 2 }
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Header with Name and ID */}
        <Box sx={{ 
          mb: { xs: 1.5, sm: 2 }, 
          textAlign: 'center',
          px: { xs: 0.5, sm: 0 }
        }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              textTransform: 'capitalize',
              fontWeight: 700,
              mb: 0.25,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' }
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

        {/* Main Details Grid - Basic Stats + Types (left), Abilities (center), Stats Chart (right) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '0.6fr 1.3fr 0.9fr',
              lg: '0.5fr 1.5fr 0.85fr'
            },
            gap: { xs: 1, sm: 1.5, md: 2 },
            mb: { xs: 1, sm: 1.5, md: 2 },
            alignItems: { md: 'start' }
          }}
        >
          {/* Column 1: Basic Stats Cards + Types */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1, sm: 1.25 },
              maxWidth: { md: '360px', lg: '400px' }
            }}
          >
            {/* Basic Stats Cards - 2x2 Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)'
                },
                gridTemplateRows: {
                  md: 'repeat(2, 1fr)'
                },
                gap: { xs: 1, sm: 1.25 }
              }}
            >
            {/* Row 1: ID (left), Height (right) */}
            <Box ref={idCardRef} sx={{ 
              width: '100%', 
              height: '100%',
              ...(cardWidth !== 'auto' && { 
                minWidth: { md: cardWidth },
                maxWidth: { md: cardWidth }
              })
            }}>
              <Card sx={{ 
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1, sm: 1.25 }, 
                  '&:last-child': { pb: { xs: 1, sm: 1.25 } }, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  flex: 1
                }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, mb: 0.5 }}
                  >
                    ID
                  </Typography>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' } }}
                  >
                    #{pokemon.id}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box ref={heightCardRef} sx={{ 
              width: '100%', 
              height: '100%',
              ...(cardWidth !== 'auto' && { 
                minWidth: { md: cardWidth },
                maxWidth: { md: cardWidth }
              })
            }}>
              <Card sx={{ 
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1, sm: 1.25 }, 
                  '&:last-child': { pb: { xs: 1, sm: 1.25 } }, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  flex: 1
                }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, mb: 0.5 }}
                  >
                    Height
                  </Typography>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' } }}
                  >
                    {pokemon.height / 10}m
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Row 2: Base Exp. (left), Weight (right) */}
            <Box ref={baseExpCardRef} sx={{ 
              width: '100%', 
              height: '100%',
              ...(cardWidth !== 'auto' && { 
                minWidth: { md: cardWidth },
                maxWidth: { md: cardWidth }
              })
            }}>
              <Card sx={{ 
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1, sm: 1.25 }, 
                  '&:last-child': { pb: { xs: 1, sm: 1.25 } }, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  flex: 1
                }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, mb: 0.5 }}
                  >
                    Base Exp.
                  </Typography>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' } }}
                  >
                    {pokemon.base_experience}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box ref={weightCardRef} sx={{ 
              width: '100%', 
              height: '100%',
              ...(cardWidth !== 'auto' && { 
                minWidth: { md: cardWidth },
                maxWidth: { md: cardWidth }
              })
            }}>
              <Card sx={{ 
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1, sm: 1.25 }, 
                  '&:last-child': { pb: { xs: 1, sm: 1.25 } }, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  flex: 1
                }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, mb: 0.5 }}
                  >
                    Weight
                  </Typography>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' } }}
                  >
                    {pokemon.weight / 10}kg
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            </Box>

            {/* Types - Below Basic Stats Grid */}
            <Paper 
              ref={typesCardRef}
              sx={{ 
                p: { xs: 1, sm: 1.25 },
                backgroundColor: 'background.paper',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                overflow: 'visible'
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight={600} 
                gutterBottom 
                sx={{ 
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                  flexShrink: 0
                }}
              >
                Types
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 0.5,
                flexWrap: 'nowrap',
                width: '100%',
                overflow: 'visible'
              }}>
                {pokemon.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: getTypeColor(type),
                      color: 'white',
                      fontWeight: 600,
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      height: { xs: 20, sm: 22 },
                      width: 'fit-content',
                      minWidth: 'fit-content',
                      px: { xs: 0.6, sm: 0.75 },
                      overflow: 'visible',
                      '& .MuiChip-label': {
                        px: { xs: 0.6, sm: 0.75 },
                        whiteSpace: 'nowrap',
                        overflow: 'visible'
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Abilities - Below Types */}
            <Paper 
              ref={abilitiesCardRef}
              sx={{ 
                p: { xs: 1, sm: 1.25 },
                backgroundColor: 'background.paper',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                overflow: 'visible'
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight={600} 
                gutterBottom 
                sx={{ 
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                  flexShrink: 0
                }}
              >
                Abilities
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 0.5,
                flexWrap: 'nowrap',
                width: '100%',
                overflow: 'visible'
              }}>
                {pokemon.abilities.map((ability) => (
                  <Chip
                    key={ability}
                    label={ability}
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      height: { xs: 20, sm: 22 },
                      width: 'fit-content',
                      minWidth: 'fit-content',
                      px: { xs: 0.6, sm: 0.75 },
                      overflow: 'visible',
                      '& .MuiChip-label': {
                        px: { xs: 0.6, sm: 0.75 },
                        whiteSpace: 'nowrap',
                        overflow: 'visible'
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Column 2: Stats Chart */}
          {pokemon.stats && (
            <Box sx={{
              justifySelf: { md: 'start' },
              maxWidth: { xs: '100%', sm: '400px', md: '500px', lg: '600px' },
              width: '100%'
            }}>
              <Typography 
                variant="h5" 
                fontWeight={600} 
                gutterBottom 
                sx={{ 
                  mb: 0.75,
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  px: { xs: 0.5, sm: 0 }
                }}
              >
                Base Stats
              </Typography>
              <Paper 
                sx={{ 
                  p: { xs: 1, sm: 1.25, md: 1.5 }, 
                  backgroundColor: 'background.paper',
                  borderRadius: 1.5
                }}
              >
                <StatsChart stats={pokemon.stats} />
              </Paper>
            </Box>
          )}

          {/* Column 3: Images */}
          {pokemon.images && pokemon.images.length > 0 && (
            <Box>
              <Typography 
                variant="h5" 
                fontWeight={600} 
                gutterBottom 
                sx={{ 
                  mb: 1,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  px: { xs: 0.5, sm: 0 }
                }}
              >
                Images
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 1, sm: 1.25, md: 1.5 }
                }}
              >
                {pokemon.images.map((image, index) => (
                  <Card
                    key={index}
                    sx={{
                      height: '100%',
                      transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                      borderRadius: 2,
                      overflow: 'hidden',
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
                        height: { xs: 100, sm: 120, md: 140 },
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
                          padding: '8px'
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
    </Box>
  );
}

