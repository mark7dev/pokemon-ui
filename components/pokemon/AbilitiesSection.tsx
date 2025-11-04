import { Paper, Typography, Box, Chip } from '@mui/material';

interface AbilitiesSectionProps {
  abilities: string[];
}

export const AbilitiesSection = ({ abilities }: AbilitiesSectionProps) => {
  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 1.25 },
        backgroundColor: 'background.paper',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'visible',
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        sx={{
          mb: 0.5,
          fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
          flexShrink: 0,
        }}
      >
        Abilities
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          flexWrap: 'nowrap',
          width: '100%',
          overflow: 'visible',
        }}
      >
        {abilities.map((ability) => (
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
                overflow: 'visible',
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

