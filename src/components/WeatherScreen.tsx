import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  CssBaseline,
} from '@mui/material';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { apiService } from '../services/api';
import type { WeatherData } from '../types/weather';

interface WeatherScreenProps {
  currentCity: string;
  sessionId: string;
}

const WeatherScreen: React.FC<WeatherScreenProps> = ({ currentCity, sessionId }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentCity) {
      fetchWeatherData();
    }
  }, [currentCity]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherResponse = await apiService.getWeatherForecast(currentCity);
      if (weatherResponse.status === 'SUCCESS') {
        setWeatherData(weatherResponse.data);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (currentCity) {
      fetchWeatherData();
    }
  };

  if (loading && !weatherData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <LoadingSpinner message="Loading weather data..." />
      </Container>
    );
  }

  if (error && !weatherData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Container>
    );
  }

  if (!currentCity) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <LoadingSpinner message="Search for a city to view weather..." />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 } }}>
      {loading && (
        <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <LoadingSpinner message="Updating weather data..." />
        </Box>
      )}

      {weatherData && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Current Weather */}
          <CurrentWeather weather={weatherData.current} city={weatherData.city} />

          {/* Hourly Forecast */}
          <HourlyForecast hourlyData={weatherData.hourly} />

          {/* Daily Forecast */}
          <DailyForecast dailyData={weatherData.daily} />
        </Box>
      )}
    </Container>
  );
};

export default WeatherScreen;
