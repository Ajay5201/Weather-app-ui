import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  WbSunny,
  Opacity,
  Air,
  Compress,
  Visibility,
  NightsStay,
  CalendarToday,
  Description,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import type { CurrentWeather as CurrentWeatherType } from '../types/weather';
import { COLORS } from '../constants/colors';
import { formatTemperature, getWeatherIconUrl, getWeatherConditionColor } from '../utils/helpers';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  city: string;
  date?: string;
  summary?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, city, date, summary }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateString?: string) => {
    const targetDate = dateString ? new Date(dateString) : new Date();
    return targetDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Generate a default summary if none provided
  const getWeatherSummary = () => {
    if (summary) {
      return summary;
    }

    // Generate a basic summary based on weather data
    // const temp = Math.round(weather.temperature);
    // const condition = weather.condition.toLowerCase();
    // const humidity = weather.humidity;
    // const windSpeed = Math.round(weather.windSpeed);

    // let summary = `Currently ${temp}°C with ${weather.condition.toLowerCase()} conditions in ${city}. `;

    // if (humidity > 70) {
    //   summary += "High humidity levels may make it feel warmer. ";
    // } else if (humidity < 30) {
    //   summary += "Low humidity creates dry conditions. ";
    // }

    // if (windSpeed > 10) {
    //   summary += "Expect breezy conditions with moderate winds. ";
    // } else if (windSpeed < 3) {
    //   summary += "Calm winds throughout the area. ";
    // }

    // if (condition.includes('rain')) {
    //   summary += "Keep an umbrella handy for any precipitation.";
    // } else if (condition.includes('sun') || condition.includes('clear')) {
    //   summary += "Perfect weather for outdoor activities.";
    // } else if (condition.includes('cloud')) {
    //   summary += "Overcast skies with comfortable conditions.";
    // }

    // return summary;
  };

  const weatherMetrics = [
    {
      icon: <Opacity />,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      color: COLORS.weather.rainy,
      bgColor: 'rgba(33, 150, 243, 0.1)',
    },
    {
      icon: <Air />,
      label: 'Wind Speed',
      value: `${weather.windSpeed} m/s`,
      color: COLORS.weather.cloudy,
      bgColor: 'rgba(158, 158, 158, 0.1)',
    },
    {
      icon: <Compress />,
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      color: COLORS.weather.stormy,
      bgColor: 'rgba(103, 58, 183, 0.1)',
    },
    {
      icon: <Visibility />,
      label: 'Wind Direction',
      value: weather.windDirection,
      color: COLORS.weather.sunny,
      bgColor: 'rgba(255, 193, 7, 0.1)',
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${getWeatherConditionColor(weather.condition)}, ${COLORS.primary.main})`,
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: 700,
                  color: COLORS.text.primary,
                  background: `linear-gradient(45deg, ${COLORS.text.primary}, ${COLORS.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {city}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <CalendarToday sx={{ fontSize: 16, color: COLORS.text.secondary, mr: 1 }} />
                <Typography variant="body2" sx={{ color: COLORS.text.secondary, fontWeight: 500 }}>
                  {formatDate(date)}
                </Typography>
              </Box>
            </Box>
            {!isMobile && (
              <Chip
                label={weather.condition}
                sx={{
                  background: `linear-gradient(45deg, ${getWeatherConditionColor(weather.condition)}, ${getWeatherConditionColor(weather.condition)}CC)`,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.5, sm: 1 },
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            )}
          </Box>
        </Box>


        {
          summary !== '' &&
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, rgba(96, 125, 139, 0.1) 0%, rgba(84, 110, 122, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(96, 125, 139, 0.2)',
              p: { xs: 2.5, sm: 3 },
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar
                sx={{
                  backgroundColor: '#607D8B',
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  boxShadow: '0 4px 12px rgba(96, 125, 139, 0.3)',
                  flexShrink: 0,
                  display: { xs: 'none', md: 'auto' }
                }}
              >
                <Description />
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: COLORS.text.primary,
                    fontWeight: 600,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Weather Summary
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.text.secondary,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  {getWeatherSummary()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        }


        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.3)',
            p: 3,
            mb: 3,
            textAlign: 'center',
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 }
          }}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={getWeatherIconUrl(weather.icon)}
                alt={weather.condition}
                style={{
                  width: isMobile ? 100 : 120,
                  height: isMobile ? 100 : 120,
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                sx={{
                  fontWeight: 800,
                  color: COLORS.text.primary,
                  lineHeight: 1,
                  mb: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {formatTemperature(weather.temperature)}
              </Typography>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  color: COLORS.text.secondary,
                  fontWeight: 500,
                }}
              >
                Feels like {formatTemperature(weather.feelsLike)}
              </Typography>
              {/* Mobile condition chip */}
              {isMobile && (
                <Chip
                  label={weather.condition}
                  size="small"
                  sx={{
                    mt: 1,
                    background: `linear-gradient(45deg, ${getWeatherConditionColor(weather.condition)}, ${getWeatherConditionColor(weather.condition)}CC)`,
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                />
              )}
            </Box>
          </Box>
        </Paper>

        {/* Weather Metrics Section */}
        {isMobile ? (
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} sx={{ mb: 2 }} justifyContent={'center'}>
              {weatherMetrics.slice(0, 2).map((metric, index) => (
                <Grid key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      background: metric.bgColor,
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.2)',
                      p: '12px',
                      width: '140px',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                        background: `linear-gradient(135deg, ${metric.bgColor}, rgba(255,255,255,0.1))`,
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: metric.color,
                        width: 40,
                        height: 40,
                        mx: 'auto',
                        mb: 1.5,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      {metric.icon}
                    </Avatar>
                    <Typography
                      variant="caption"
                      sx={{
                        color: COLORS.text.secondary,
                        mb: 0.5,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'block'
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: COLORS.text.primary
                      }}
                    >
                      {metric.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2} justifyContent={'center'}>
              {weatherMetrics.slice(2, 4).map((metric, index) => (
                <Grid key={index + 2}>
                  <Paper
                    elevation={0}
                    sx={{
                      background: metric.bgColor,
                      backdropFilter: 'blur(10px)',
                      width: '140px',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.2)',
                      p: '12px',
                      textAlign: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                        background: `linear-gradient(135deg, ${metric.bgColor}, rgba(255,255,255,0.1))`,
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: metric.color,
                        width: 40,
                        height: 40,
                        mx: 'auto',
                        mb: 1.5,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      {metric.icon}
                    </Avatar>
                    <Typography
                      variant="caption"
                      sx={{
                        color: COLORS.text.secondary,
                        mb: 0.5,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'block'
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: COLORS.text.primary
                      }}
                    >
                      {metric.value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} justifyContent={'center'}>
            {weatherMetrics.map((metric, index) => (
              <Grid key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    background: metric.bgColor,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.2)',
                    p: { xs: 2, sm: 2.5 },
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    width: '200px',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                      background: `linear-gradient(135deg, ${metric.bgColor}, rgba(255,255,255,0.1))`,
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: metric.color,
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      mx: 'auto',
                      mb: 1.5,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                  <Typography
                    variant="caption"
                    sx={{
                      color: COLORS.text.secondary,
                      mb: 0.5,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      display: 'block'
                    }}
                  >
                    {metric.label}
                  </Typography>
                  <Typography
                    variant={isMobile ? "body1" : "h6"}
                    sx={{
                      fontWeight: 700,
                      color: COLORS.text.primary
                    }}
                  >
                    {metric.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Sunrise/Sunset Section */}
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 3, background: 'rgba(0,0,0,0.08)' }} />
          <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent={'center'}>
            <Grid>
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 193, 7, 0.2)',
                  p: { xs: 2, sm: 2.5 },
                  textAlign: 'center',
                  width: isMobile ? 'auto' : '200px',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: '#FF9800',
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    mx: 'auto',
                    mb: 1.5,
                    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
                  }}
                >
                  <WbSunny />
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.text.secondary,
                    mb: 0.5,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block'
                  }}
                >
                  Sunrise
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={{
                    fontWeight: 700,
                    color: COLORS.text.primary
                  }}
                >
                  {formatTime(weather.sunrise)}
                </Typography>
              </Paper>
            </Grid>

            <Grid>
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg, rgba(63, 81, 181, 0.1) 0%, rgba(103, 58, 183, 0.1) 100%)',
                  borderRadius: 2,
                  border: '1px solid rgba(63, 81, 181, 0.2)',
                  p: { xs: 2, sm: 2.5 },
                  textAlign: 'center',
                  width: isMobile ? 'auto' : '200px',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: '#3F51B5',
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    mx: 'auto',
                    mb: 1.5,
                    boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
                  }}
                >
                  <NightsStay />
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.text.secondary,
                    mb: 0.5,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block'
                  }}
                >
                  Sunset
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  sx={{
                    fontWeight: 700,
                    color: COLORS.text.primary
                  }}
                >
                  {formatTime(weather.sunset) || 'N/A'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;