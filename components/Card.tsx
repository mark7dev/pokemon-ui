'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export const PokemonCard = () => {

  const handleClick = () => {
    console.log('Card clicked');
  }

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/logo.png"
          alt="pokemon"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pokemon
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Pokemon are a diverse group of creatures, each with their own unique abilities and characteristics.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonCard;
