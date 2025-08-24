import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import type { HourlyForecast as HourlyForecastType } from '../types/weather';
import { COLORS } from '../constants/colors';
import { formatTemperature, getWeatherIconUrl, formatTime, getDayDisplayName } from '../utils/helpers';
import { Air } from '@mui/icons-material';

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));





  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: COLORS.text.primary,
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}
      >
        Hourly Forecast
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1.5, sm: 2 },
          overflowX: 'auto',
          pb: 2,
          alignItems: 'stretch',
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: COLORS.primary.main,
            borderRadius: 3,
            '&:hover': {
              backgroundColor: COLORS.primary.dark,
            },
          },
        }}
      >
        {hourlyData.slice(0, 24).map((hour, index) => {



          return (
            <Card
              key={index}
              elevation={0}
              sx={{
                minWidth: { xs: 130, sm: 160 },
                width: { xs: 130, sm: 160 },
                height: 'auto',
                backdropFilter: 'blur(20px)',
                borderRadius: 3,
                border:
                  '1px solid rgba(0,0,0,0.08)',
                boxShadow:
                  `0 8px 25px ${COLORS.primary.main}30`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  textAlign: 'center',
                  '&:last-child': { pb: { xs: 1.5, sm: 2 } }
                }}
              >

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    mb: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.95rem', sm: '14px' }
                  }}
                >
                  {getDayDisplayName(hour.time)} <br /> {formatTime(hour.time)}
                </Typography>

                {/* Weather Icon */}
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={getWeatherIconUrl(hour.icon)}
                    alt={hour.condition}
                    style={{
                      width: isMobile ? 36 : 42,
                      height: isMobile ? 36 : 42,
                      objectFit: 'contain',
                    }}
                  />
                </Box>


                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: COLORS.info,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 0.2,
                  }}
                >
                  {formatTemperature(hour.temperature)}
                </Typography>


                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.text.secondary,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    lineHeight: 1.2,
                    mb: 2,
                    // height: '2.4em',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 700,
                  }}
                >
                  {hour.condition}
                </Typography>


                <Box sx={{ width: '100%' }}>
                  {hour.precipitationChance > 0 ? (
                    <Chip
                      label={`💧 ${hour.precipitationChance}%`}
                      size="small"
                      sx={{
                        backgroundColor: COLORS.weather.rainy,
                        color: 'white',
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: { xs: 20, sm: 22 },
                        mb: 0.5,
                        minWidth: { xs: '45px', sm: '50px' },
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: { xs: 20, sm: 22 },
                        mb: 0.5,
                        minWidth: { xs: '45px', sm: '50px' },
                      }}
                    />
                  )}

                  <Box display="flex" alignItems="center" gap={0.5} justifyContent={'center'} marginTop={1}>
                    <Air sx={{ fontSize: { xs: 14, sm: 16 }, color: COLORS.text.primary }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: COLORS.warning,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        fontWeight: 500,
                      }}
                    >
                      {hour.windSpeed} m/s
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box >
  );
};

export default HourlyForecast;