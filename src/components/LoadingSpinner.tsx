import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { COLORS } from '../constants/colors';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading weather data...', 
  size = 40 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        gap: 2,
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: COLORS.primary.main,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: COLORS.text.secondary,
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
