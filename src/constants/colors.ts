export const COLORS = {
  // Primary colors
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  
  // Secondary colors
  secondary: {
    main: '#dc004e',
    light: '#ff5983',
    dark: '#9a0036',
    contrastText: '#ffffff',
  },
  
  // Weather-specific colors
  weather: {
    sunny: '#ff9800',
    cloudy: '#78909c',
    rainy: '#2196f3',
    snowy: '#90caf9',
    stormy: '#5c6bc0',
    clear: '#4caf50',
  },
  
  // Temperature colors
  temperature: {
    hot: '#f44336',
    warm: '#ff9800',
    mild: '#4caf50',
    cool: '#2196f3',
    cold: '#3f51b5',
  },
  
  // Background colors
  background: {
    primary: '#fafafa',
    secondary: '#ffffff',
    card: '#ffffff',
    paper: '#ffffff',
    dark: '#121212',
  },
  
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd',
    hint: '#9e9e9e',
  },
  
  // Border colors
  border: {
    light: '#e0e0e0',
    medium: '#bdbdbd',
    dark: '#757575',
  },
  
  // Success/Error colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
} as const;
