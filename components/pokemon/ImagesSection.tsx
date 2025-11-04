import { Typography, Box, Card } from '@mui/material';
import Image from 'next/image';

interface ImagesSectionProps {
  images: string[];
  pokemonName: string;
}

export const ImagesSection = ({ images, pokemonName }: ImagesSectionProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        sx={{
          mb: 1,
          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
          px: { xs: 0.5, sm: 0 },
        }}
      >
        Images
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, sm: 1.25, md: 1.5 },
        }}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            sx={{
              height: '100%',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              borderRadius: 2,
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
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
                overflow: 'hidden',
              }}
            >
              <Image
                src={image || '/no-image.svg'}
                alt={`${pokemonName} image ${index + 1}`}
                fill
                style={{
                  objectFit: 'contain',
                  padding: '8px',
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
  );
};

