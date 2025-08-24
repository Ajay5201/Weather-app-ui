import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from './constants/colors';
import TopBar from './components/TopBar';
import WeatherScreen from './components/WeatherScreen';
import PreferencesScreen from './components/PreferencesScreen';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { apiService } from './services/api';

import { generateSessionId, getUserCurrentCity } from './utils/helpers';
import type { WeatherData } from './types/weather';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
      light: COLORS.primary.light,
      dark: COLORS.primary.dark,
      contrastText: COLORS.primary.contrastText,
    },
    secondary: {
      main: COLORS.secondary.main,
      light: COLORS.secondary.light,
      dark: COLORS.secondary.dark,
      contrastText: COLORS.secondary.contrastText,
    },
    background: {
      default: COLORS.background.primary,
      paper: COLORS.background.paper,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export const SESSION_KEY = "userSession";

// Main App Content Component
function AppContent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError(null);

        const savedSession = localStorage.getItem(SESSION_KEY);

        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          setSessionId(parsed.sessionId);
          setCurrentCity(parsed.city);
        } else {
          const userCity = await getUserCurrentCity();
          const newSessionId = generateSessionId();
          setSessionId(newSessionId);
          setCurrentCity(userCity);
          await apiService.createUserSession(newSessionId, userCity);
          localStorage.setItem(
            SESSION_KEY,
            JSON.stringify({ sessionId: newSessionId, city: userCity })
          );
        }
      } catch (err) {
        console.error('Error initializing app:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize app');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle city selection from search
  const handleCitySelect = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentCity(city);

      // Navigate to home page when city is selected
      navigate('/');

      const weatherResponse = await apiService.getWeatherForecast(city);
      if (weatherResponse.status === 'SUCCESS') {
        setWeatherData(weatherResponse.data);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (err) {
      console.error('Error fetching weather for city:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Handle preferences button click
  const handlePreferencesClick = () => {
    if (location.pathname === '/preferences') {
      navigate('/');
    } else {
      navigate('/preferences');
    }
  };

  // Handle city selection from preferences
  const handlePreferencesCitySelect = (city: string) => {
    setCurrentCity(city);
    navigate('/');
    // Weather data will be fetched in the WeatherScreen component
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar
          onCitySelect={handleCitySelect}
          currentCity={currentCity}
          onPreferencesClick={handlePreferencesClick}
        />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <LoadingSpinner message="Initializing weather app..." />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar
          onCitySelect={handleCitySelect}
          currentCity={currentCity}
          onPreferencesClick={handlePreferencesClick}
        />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar
        onCitySelect={handleCitySelect}
        currentCity={currentCity}
        onPreferencesClick={handlePreferencesClick}
      />

      <Routes>
        <Route
          path="/"
          element={
            <WeatherScreen
              currentCity={currentCity}
              sessionId={sessionId}
            />
          }
        />
        <Route
          path="/preferences"
          element={
            <PreferencesScreen
              sessionId={sessionId}
              onCitySelect={handlePreferencesCitySelect}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

// Main App Component with Router
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
