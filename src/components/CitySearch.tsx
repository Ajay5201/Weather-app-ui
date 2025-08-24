import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';
import { apiService } from '../services/api';
import { COLORS } from '../constants/colors';
import type { CityInfo } from '../types/weather';
import { SESSION_KEY } from '../App';


function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface CitySearchProps {
  onCitySelect: (city: string) => void;
  currentCity?: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect, currentCity }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<CityInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchCities = async () => {
      if (debouncedSearch.length >= 2) {
        setLoading(true);
        try {
          const response = await apiService.searchCities(debouncedSearch);
          if (response.status === 'SUCCESS') {
            setCities(response.data);
          }
        } catch (error) {
          console.error('Error searching cities:', error);
          setCities([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [debouncedSearch]);

  // Initialize with current city if provided
  useEffect(() => {
    if (currentCity) {
      setSearchQuery(currentCity);
      // Reset selectedCity when currentCity changes from external source
      setSelectedCity(null);
    } else {
      // Clear search when currentCity is empty (going to preferences)
      setSearchQuery('');
      setSelectedCity(null);
    }
  }, [currentCity]);

  // Clear search when navigating to preferences
  useEffect(() => {
    if (location.pathname === '/preferences') {
      setSearchQuery('');
      setSelectedCity(null);
      setOpen(false);
    } else if (location.pathname === '/' && currentCity) {
      // Restore session city when returning to weather from preferences
      setSearchQuery(currentCity);
      setSelectedCity(null);
    }
  }, [location.pathname, currentCity]);

  const handleCitySelect = async (city: CityInfo | null) => {
    if (city) {
      setSelectedCity(city);
      onCitySelect(city.name);

      // Add city to preferences if we have a session
      const savedSession = localStorage.getItem(SESSION_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        // Add city to user preferences
        try {
          await apiService.addCityToUser(parsed.sessionId, city.name);
        } catch (error) {
          console.error('Error adding city to preferences:', error);
          // Continue with city selection even if adding to preferences fails
        }
      }

      setSearchQuery(city.displayName);
      setOpen(false);
    }
  };

  const handleInputChange = (event: any, newInputValue: string, reason: string) => {

    if (reason === 'input') {
      setSelectedCity(null);
    }
    setSearchQuery(newInputValue);
  };

  const handleClose = (event: any, reason: string) => {

    if (reason === 'escape' || reason === 'blur') {
      if (selectedCity && !searchQuery) {
        setSearchQuery(selectedCity.displayName);
      }
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 450, md: 500 },
      }}
    >
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={handleClose}
        options={cities}
        getOptionLabel={(option) => option.displayName}
        loading={loading}
        value={selectedCity}
        onChange={(_, newValue) => handleCitySelect(newValue)}
        inputValue={searchQuery}
        onInputChange={handleInputChange}
        freeSolo={false}
        clearOnEscape={false}
        clearOnBlur={false}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={isMobile ? "Search cities..." : "Search for a city..."}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <SearchIcon
                  sx={{
                    color: COLORS.text.secondary,
                    mr: 1,
                    fontSize: { xs: 20, sm: 24 },
                  }}
                />
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={isMobile ? 18 : 22}
                      sx={{ mr: 1 }}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: { xs: 2, sm: 3 },
                border: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover': {
                  background: 'rgba(255,255,255,0.95)',
                  border: `1px solid ${COLORS.primary.main}40`,
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
                '&.Mui-focused': {
                  background: 'rgba(255,255,255,1)',
                  border: `2px solid ${COLORS.primary.main}`,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 20px ${COLORS.primary.main}20`,
                },
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 500,
                '&::placeholder': {
                  color: COLORS.text.secondary,
                  opacity: 0.8,
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 2 },
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: `${COLORS.primary.main}08`,
              },
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: COLORS.text.primary,
                  mb: 0.25,
                }}
              >
                {option.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.text.secondary,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  fontWeight: 500,
                }}
              >
                {option.state && option.country
                  ? `${option.state}, ${option.country}`
                  : option.country}
              </Typography>
            </Box>
          </Box>
        )}
        noOptionsText={
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: COLORS.text.secondary,
              py: 2,
              fontWeight: 500,
            }}
          >
            {searchQuery.length >= 2 ? 'No cities found' : 'Type at least 2 characters to search'}
          </Typography>
        }

      />
    </Box>
  );
};

export default CitySearch;