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
import Grid from '@mui/material/Grid';

import { COLORS } from '../constants/colors';
import type { DailyForecast as DailyForecastType } from '../types/weather';
import { formatTemperature, getWeatherIconUrl, getDayDisplayName, isToday } from '../utils/helpers';
import { Air } from '@mui/icons-material';

interface DailyForecastProps {
    dailyData: DailyForecastType[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ dailyData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const getTemperatureGradient = (maxTemp: number, minTemp: number) => {
        const avgTemp = (maxTemp + minTemp) / 2;
        if (avgTemp >= 30) return 'linear-gradient(135deg, #ff6b6b, #ee5a24)'; // Hot
        if (avgTemp >= 20) return 'linear-gradient(135deg, #feca57, #ff9ff3)'; // Warm
        if (avgTemp >= 10) return 'linear-gradient(135deg, #48cae4, #0077b6)'; // Cool
        return 'linear-gradient(135deg, #a8dadc, #457b9d)'; // Cold
    };

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
                Day Forecast
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} justifyContent={'center'}>
                {dailyData.map((day, index) => {
                    const today = isToday(day.date);

                    return (
                        <Grid key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    background: today
                                        ? `linear-gradient(135deg, ${COLORS.primary.main}15, ${COLORS.primary.light}25)`
                                        : 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: 3,
                                    border: today
                                        ? `2px solid ${COLORS.primary.main}`
                                        : '1px solid rgba(0,0,0,0.08)',
                                    boxShadow: today
                                        ? `0 8px 25px ${COLORS.primary.main}30`
                                        : '0 4px 15px rgba(0,0,0,0.08)',
                                    height: '100%',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                                    },
                                    '&::before': today ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '3px',
                                        background: `linear-gradient(90deg, ${COLORS.primary.main}, ${COLORS.primary.light})`,
                                    } : {},
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: { xs: 2, sm: 2.5 },
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        height: '100%',
                                        justifyContent: 'space-between',
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: today ? 700 : 600,
                                            color: today ? COLORS.primary.main : COLORS.text.primary,
                                            mb: { xs: 1, sm: 1.5 },
                                            fontSize: { xs: '0.95rem', sm: '1.1rem' }
                                        }}
                                    >
                                        {getDayDisplayName(day.date)}
                                    </Typography>

                                    {/* Weather Icon */}
                                    <Box sx={{ mb: { xs: 1, sm: 1.5 }, display: 'flex', justifyContent: 'center' }}>
                                        <img
                                            src={getWeatherIconUrl(day.icon)}
                                            alt={day.condition}
                                            style={{
                                                width: isMobile ? 45 : 55,
                                                height: isMobile ? 45 : 55,
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                            }}
                                        />
                                    </Box>


                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: COLORS.text.secondary,
                                            mb: { xs: 1.5, sm: 2 },
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                            fontWeight: 500,
                                            minHeight: '1.5em',
                                        }}
                                    >
                                        {day.condition}
                                    </Typography>

                                    <Box
                                        sx={{
                                            background: getTemperatureGradient(day.maxTemp, day.minTemp),
                                            borderRadius: 2,
                                            p: { xs: 1, sm: 1.5 },
                                            mb: { xs: 1.5, sm: 2 },
                                            width: '100%',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'white',
                                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                                    fontSize: { xs: '1rem', sm: '1.1rem' }
                                                }}
                                            >
                                                {formatTemperature(day.maxTemp)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255,255,255,0.8)',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                /
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'rgba(255,255,255,0.9)',
                                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                                }}
                                            >
                                                {formatTemperature(day.minTemp)}
                                            </Typography>
                                        </Box>
                                    </Box>


                                    <Box sx={{ width: '100%' }}>
                                        {day.precipitationChance > 0 ? (
                                            <Chip
                                                label={`💧 ${day.precipitationChance}%`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: COLORS.weather.rainy,
                                                    color: 'white',
                                                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                                    height: { xs: 22, sm: 24 },
                                                    mb: 1,
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ) : <Box
                                            sx={{
                                                height: { xs: 20, sm: 22 },
                                                mb: 0.5,
                                                minWidth: { xs: '45px', sm: '50px' },
                                            }}
                                        />
                                        }

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
                                                {day.windSpeed} m/s
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default DailyForecast;