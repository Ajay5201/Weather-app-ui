import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  WbSunny as WeatherIcon,
  LocationOn,
  Favorite as FavoriteIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { COLORS } from '../constants/colors';
import CitySearch from './CitySearch';

interface TopBarProps {
  onCitySelect: (city: string) => void;
  currentCity?: string;
  onPreferencesClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onCitySelect, currentCity, onPreferencesClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const currentView = location.pathname === '/preferences' ? 'preferences' : 'weather';
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleHomeClick = () => {
    navigate('/');
    setMenuAnchor(null);
  };

  const handlePreferencesClick = () => {
    onPreferencesClick();
    setMenuAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        color: COLORS.text.primary,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            px: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 1.5 },
            minHeight: { xs: '64px', sm: '80px' },
          }}
        >

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: { xs: 2, sm: 4 },
              minWidth: 'fit-content',
            }}
          >
            <Tooltip title="Go to Home">
              <IconButton
                onClick={handleLogoClick}
                sx={{
                  p: 0,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: COLORS.primary.main,
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                    mr: { xs: 1, sm: 1.5 },
                    boxShadow: `0 4px 12px ${COLORS.primary.main}30`,
                    cursor: 'pointer',
                  }}
                >
                  <WeatherIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Avatar>
              </IconButton>
            </Tooltip>

            <Box>
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                  fontWeight: 700,
                  color: COLORS.text.primary,
                  lineHeight: 1.2,
                  fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                  background: `linear-gradient(45deg, ${COLORS.text.primary}, ${COLORS.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {currentView === 'preferences'
                  ? (isMobile ? '' : 'My Preferences')
                  : (isMobile ? '' : isTablet ? 'Weather App' : 'Weather Forecast')
                }
              </Typography>

              {/* Current Location Chip - Only show on larger screens and when there's a current city */}
              {!isMobile && currentCity && currentView === 'weather' && (
                <Chip
                  icon={<LocationOn sx={{ fontSize: '14px !important' }} />}
                  label={currentCity}
                  size="small"
                  sx={{
                    mt: 0.5,
                    height: 20,
                    backgroundColor: `${COLORS.primary.main}15`,
                    color: COLORS.primary.main,
                    border: `1px solid ${COLORS.primary.main}30`,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      fontSize: 14,
                    },
                  }}
                />
              )}
            </Box>
          </Box>


          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: { xs: 'flex-end', sm: 'center' },
              maxWidth: { xs: '60%', sm: '100%' },
            }}
          >
            <CitySearch
              onCitySelect={onCitySelect}
              currentCity={currentCity}
            />
          </Box>


          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 2,
              minWidth: 'fit-content',
            }}
          >

            {isMobile && (
              <Tooltip title="Menu">
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}


            {!isMobile && (
              <Tooltip title={currentView === 'preferences' ? 'Back to Weather' : 'My Preferences'}>
                <Button
                  variant={currentView === 'preferences' ? 'contained' : 'outlined'}
                  onClick={onPreferencesClick}
                  startIcon={<FavoriteIcon />}
                  sx={{
                    backgroundColor: currentView === 'preferences'
                      ? COLORS.primary.main
                      : 'transparent',
                    color: currentView === 'preferences'
                      ? 'white'
                      : COLORS.primary.main,
                    border: `2px solid ${COLORS.primary.main}`,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: currentView === 'preferences'
                        ? COLORS.primary.dark
                        : `${COLORS.primary.main}10`,
                      transform: 'translateY(-1px)',
                      boxShadow: `0 4px 12px ${COLORS.primary.main}30`,
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {currentView === 'preferences' ? 'Weather' : 'Preferences'}
                </Button>
              </Tooltip>
            )}


            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    fontSize: '0.85rem',
                  }}
                >
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                >
                  {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>


      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <MenuItem onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handlePreferencesClick}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Preferences</ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopBar;