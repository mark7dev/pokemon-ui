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
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={pokemon.image}
          alt={pokemon.name}
          sx={{ objectFit: 'contain', backgroundColor: 'grey.100' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
            {pokemon.name}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {pokemon.types.map((type, index) => (
              <Chip
                key={index}
                label={type}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: getTypeColor(type),
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            ))}
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
