import { Alert, Box } from '@mui/material';

interface ErrorStateProps {
  message?: string;
  error?: string;
}

export const ErrorState = ({ message = 'Error loading data', error }: ErrorStateProps) => {
  return (
    <Box sx={{ p: 4 }}>
      <Alert severity="error">
        {error ? `${message}: ${error}` : message}
      </Alert>
    </Box>
  );
};

