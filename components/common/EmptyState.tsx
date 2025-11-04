import { Typography, Box } from '@mui/material';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message = 'No items found' }: EmptyStateProps) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

