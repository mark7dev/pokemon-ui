'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Chip, Box } from '@mui/material';
import { Pokemon } from '@/hooks/usePokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {

  const handleClick = () => {
    console.log('Card clicked:', pokemon.name);
  }

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%',
        minHeight: 280,
        maxWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        cursor: 'pointer'
      }} 
      onClick={handleClick}
    >
      <CardActionArea 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch'
        }}
      >
        {/* Image container with fixed aspect ratio */}
        <Box
          sx={{
            width: '100%',
            height: 200,
            position: 'relative',
            backgroundColor: 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <CardMedia
            component="img"
            image={pokemon.image}
            alt={pokemon.name}
            sx={{ 
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>

        {/* Content with consistent height */}
        <CardContent 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            pt: 1,
            pb: 1.5,
            '&:last-child': { pb: 1.5 }
          }}
        >
          {/* Pokemon name and types together */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '1.1rem',
                lineHeight: 1,
                mt: 1,
                mb: 1,
                minHeight: 'auto'
              }}
            >
              {pokemon.name}
            </Typography>

            {/* Types container */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 0.8,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                mt: 0.8
              }}
            >
            {pokemon.types.map((type, index) => (
              <Chip
                key={index}
                label={type}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: getTypeColor(type),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5
                  },
                  boxShadow: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 2
                  }
                }}
              />
            ))}
          </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// Function to get colors based on Pokemon type
const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    fire: '#FF6B6B',
    water: '#4ECDC4',
    grass: '#45B7D1',
    electric: '#FFA07A',
    psychic: '#DA70D6',
    ice: '#87CEEB',
    dragon: '#6A5ACD',
    dark: '#2F4F4F',
    fairy: '#FFB6C1',
    normal: '#D3D3D3',
    fighting: '#CD853F',
    poison: '#9370DB',
    ground: '#F4A460',
    flying: '#87CEFA',
    bug: '#9ACD32',
    rock: '#A0522D',
    ghost: '#6B46C1',
    steel: '#708090',
  };
  
  return typeColors[type.toLowerCase()] || '#78716C';
};

export default PokemonCard;
