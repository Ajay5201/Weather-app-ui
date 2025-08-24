import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { COLORS } from '../constants/colors';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        gap: 2,
        textAlign: 'center',
      }}
    >
      <Alert
        severity="error"
        sx={{
          maxWidth: 400,
          '& .MuiAlert-message': {
            color: COLORS.text.primary,
          },
        }}
      >
        <Typography variant="body1" sx={{ mb: 1 }}>
          {message}
        </Typography>
        {onRetry && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{
              mt: 1,
              borderColor: COLORS.error,
              color: COLORS.error,
              '&:hover': {
                borderColor: COLORS.error,
                backgroundColor: `${COLORS.error}10`,
              },
            }}
          >
            Try Again
          </Button>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
