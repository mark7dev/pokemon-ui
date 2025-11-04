import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode, forwardRef } from 'react';

interface BasicStatCardProps {
  label: string;
  value: ReactNode;
  cardWidth?: string;
}

export const BasicStatCard = forwardRef<HTMLDivElement, BasicStatCardProps>(
  ({ label, value, cardWidth }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          width: '100%',
          height: '100%',
          ...(cardWidth !== 'auto' && {
            minWidth: { md: cardWidth },
            maxWidth: { md: cardWidth },
          }),
        }}
      >
      <Card
        sx={{
          borderRadius: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent
          sx={{
            p: { xs: 1, sm: 1.25 },
            '&:last-child': { pb: { xs: 1, sm: 1.25 } },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, mb: 0.5 }}
          >
            {label}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.25rem' } }}
          >
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Box>
    );
  }
);

BasicStatCard.displayName = 'BasicStatCard';

