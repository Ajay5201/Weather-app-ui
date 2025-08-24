import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  Skeleton,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Favorite as FavoriteIcon,
  Delete as DeleteIcon,
  WbSunny as SunnyIcon,
  Cloud as CloudIcon,
  Opacity as RainIcon,
  AcUnit as SnowIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { COLORS } from '../constants/colors';
import { apiService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface PreferencesProps {
  sessionId: string;
  onCitySelect: (city: string) => void;
}

interface CityWeather {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const Preferences: React.FC<PreferencesProps> = ({ sessionId, onCitySelect }) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [cityWeathers, setCityWeathers] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingCity, setDeletingCity] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    city: string | null;
  }>({ open: false, city: null });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    fetchPreferences();
  }, [sessionId]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the new API that returns both preferences and weather data
      const weatherResponse = await apiService.getMultiWeatherForecast(sessionId);
      if (weatherResponse.status === 'SUCCESS') {
        const weatherData = weatherResponse.data;

        // Extract cities from the weather data keys
        const cities = Object.keys(weatherData);
        setPreferences(cities);

        // Create weather data array from the response
        const cityWeathersData = cities.map((city: string) => {
          const cityWeather = weatherData[city];
          return {
            city,
            temperature: cityWeather.temperature,
            condition: cityWeather.condition,
            icon: cityWeather.icon,
          };
        });

        setCityWeathers(cityWeathersData);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (err) {
      console.error('Error fetching preferences:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCity = async (city: string) => {
    try {
      setDeletingCity(city);
      const response = await apiService.removeCityFromPreferences(sessionId, city);
      if (response.status === 'SUCCESS') {
        // Remove city from both preferences and weather data
        setPreferences(prev => prev.filter(c => c !== city));
        setCityWeathers(prev => prev.filter(w => w.city !== city));

        setSnackbar({
          open: true,
          message: `${city} removed from preferences`,
          severity: 'success'
        });
      } else {
        throw new Error('Failed to remove city');
      }
    } catch (err) {
      console.error('Error removing city:', err);
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to remove city',
        severity: 'error'
      });
    } finally {
      setDeletingCity(null);
      setDeleteDialog({ open: false, city: null });
    }
  };

  const handleDeleteClick = (city: string) => {
    setDeleteDialog({ open: true, city });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, city: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.city) {
      handleDeleteCity(deleteDialog.city);
    }
  };

  const handleCityClick = (city: string) => {
    onCitySelect(city);
  };

  const handleRetry = () => {
    fetchPreferences();
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return <SunnyIcon />;
    if (lowerCondition.includes('cloud')) return <CloudIcon />;
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return <RainIcon />;
    if (lowerCondition.includes('snow')) return <SnowIcon />;
    return <SunnyIcon />;
  };

  const getBackgroundGradient = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    if (lowerCondition.includes('cloud')) {
      return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
    }
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }
    if (lowerCondition.includes('snow')) {
      return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                backgroundColor: COLORS.primary.main,
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                boxShadow: `0 4px 20px ${COLORS.primary.main}40`,
              }}
            >
              <FavoriteIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </Avatar>
            <Box>
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                sx={{
                  fontWeight: 700,
                  color: COLORS.text.primary,
                  background: `linear-gradient(45deg, ${COLORS.text.primary}, ${COLORS.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                City {isMobile && 'Preferences'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: COLORS.text.secondary,
                  fontWeight: 500,
                  mt: 0.5,
                }}
              >
                {preferences.length} {preferences.length === 1 ? 'city' : 'cities'} saved
              </Typography>
            </Box>
          </Box>

          {/* Refresh Button */}
          <IconButton
            onClick={fetchPreferences}
            disabled={loading}
            sx={{
              backgroundColor: `${COLORS.primary.main}15`,
              color: COLORS.primary.main,
              border: `1px solid ${COLORS.primary.main}30`,
              width: { xs: 44, sm: 48 },
              height: { xs: 44, sm: 48 },
              '&:hover': {
                backgroundColor: `${COLORS.primary.main}25`,
                transform: 'scale(1.05)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(0,0,0,0.05)',
                color: COLORS.text.secondary,
              },
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? (
              <LoadingSpinner size={20} />
            ) : (
              <RefreshIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
            )}
          </IconButton>
        </Box>

        {/* Content */}
        {preferences.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: COLORS.primary.main,
                mx: 'auto',
                mb: 3,
                boxShadow: `0 8px 32px ${COLORS.primary.main}40`,
              }}
            >
              <LocationIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                color: COLORS.text.primary,
                fontWeight: 600,
                mb: 2,
              }}
            >
              No saved cities yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: COLORS.text.secondary,
                opacity: 0.8,
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              Search for cities to add them to your favorites. Your saved cities will appear here for quick access.
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {preferences.map((city) => {
              const weatherData = cityWeathers.find(w => w.city === city);
              const temperature = weatherData?.temperature || 0;
              const condition = weatherData?.condition || 'Unknown';

              return (
                <Box key={city}>
                  <Card
                    sx={{
                      height: 280,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: getBackgroundGradient(condition),
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        '& .city-overlay': {
                          opacity: 1,
                        },
                      },
                    }}
                    onClick={(e) => {

                      if (!(e.target as HTMLElement).closest('[data-delete-button]')) {
                        handleCityClick(city);
                      }
                    }}
                  >

                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.1)',
                        opacity: 0.3,
                      }}
                    />

                    <CardContent
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: 'white',
                              fontSize: '1.2rem',
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            }}
                          >
                            {city}
                          </Typography>
                          <Chip
                            label="Click to view"
                            size="small"
                            sx={{
                              mt: 1,
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                              border: '1px solid rgba(255,255,255,0.3)',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </Box>

                        <IconButton
                          size="small"
                          data-delete-button="true"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteClick(city);
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          disabled={deletingCity === city}
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.3)',
                              transform: 'scale(1.1)',
                            },
                            '&:disabled': {
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              color: 'rgba(255,255,255,0.5)',
                            },
                            transition: 'all 0.2s ease',
                            zIndex: 10,
                            position: 'relative',
                          }}
                        >
                          {deletingCity === city ? (
                            <CircularProgress
                              size={18}
                              sx={{
                                color: 'rgba(255,255,255,0.7)',
                                '& .MuiCircularProgress-circle': {
                                  strokeWidth: 2,
                                }
                              }}
                            />
                          ) : (
                            <DeleteIcon sx={{ fontSize: 18 }} />
                          )}
                        </IconButton>
                      </Box>


                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 700,
                              color: 'white',
                              fontSize: '2.5rem',
                              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              lineHeight: 1,
                            }}
                          >
                            {condition === 'Loading...' ? '...' : `${Math.round(temperature)}°`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.9)',
                              fontWeight: 600,
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                              mt: 0.5,
                            }}
                          >
                            {condition}
                          </Typography>
                        </Box>

                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            border: '2px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                          }}
                        >
                          {getWeatherIcon(condition)}
                        </Avatar>
                      </Box>
                    </CardContent>


                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>


      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>


      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to remove {deleteDialog.city} from your saved cities? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Preferences;
