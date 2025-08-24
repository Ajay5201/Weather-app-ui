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
  Badge,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  WbSunny as WeatherIcon,
  LocationOn,
  Favorite as FavoriteIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import { COLORS } from '../constants/colors';
import CitySearch from './CitySearch';

interface TopBarProps {
  onCitySelect: (city: string) => void;
  currentCity?: string;
  onPreferencesClick: () => void;
  hasPreferences?: boolean; // New prop to indicate if user has saved preferences
}

const TopBar: React.FC<TopBarProps> = ({
  onCitySelect,
  currentCity,
  onPreferencesClick,
  hasPreferences = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const currentView = location.pathname === '/preferences' ? 'preferences' : 'weather';
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    navigate('/preferences');
    setMenuAnchor(null);
  };


  const getPreferencesButtonStyles = () => {
    const isActive = currentView === 'preferences';

    return {
      position: 'relative',
      backgroundColor: isActive
        ? COLORS.primary.main
        : isHovered
          ? `${COLORS.primary.main}15`
          : 'rgba(255,255,255,0.8)',
      color: isActive ? 'white' : COLORS.primary.main,
      border: `2px solid ${COLORS.primary.main}`,
      borderRadius: 3,
      px: { xs: 1.5, sm: 2.5 },
      py: { xs: 0.8, sm: 1.2 },
      fontWeight: 700,
      textTransform: 'none',
      minWidth: { xs: 'auto', sm: '140px' },
      fontSize: { xs: '0.8rem', sm: '0.9rem' },
      boxShadow: isActive
        ? `0 8px 25px ${COLORS.primary.main}40, 0 0 0 1px ${COLORS.primary.main}20`
        : isHovered
          ? `0 6px 20px ${COLORS.primary.main}30, 0 0 0 1px ${COLORS.primary.main}30`
          : '0 2px 10px rgba(0,0,0,0.08)',
      '&:hover': {
        backgroundColor: isActive
          ? COLORS.primary.dark
          : `${COLORS.primary.main}20`,
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: isActive
          ? `0 12px 35px ${COLORS.primary.main}50, 0 0 0 2px ${COLORS.primary.main}30`
          : `0 8px 25px ${COLORS.primary.main}40, 0 0 0 2px ${COLORS.primary.main}40`,
      },
      '&:active': {
        transform: 'translateY(-1px) scale(1.01)',
      },
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isActive
          ? 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
          : 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
        transform: isHovered ? 'translateX(-100%)' : 'translateX(100%)',
        transition: 'transform 0.6s ease',
      }
    };
  };

  const PreferencesIcon = () => {
    const isActive = currentView === 'preferences';

    if (isActive) {
      return (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FavoriteIcon sx={{
            fontSize: { xs: 18, sm: 20 },
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))'
          }} />
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.7, transform: 'scale(1)' },
                '50%': { opacity: 0.3, transform: 'scale(1.2)' },
                '100%': { opacity: 0.7, transform: 'scale(1)' },
              },
            }}
          />
        </Box>
      );
    }

    return hasPreferences ? (
      <Badge
        badgeContent=""
        color="success"
        variant="dot"
        sx={{
          '& .MuiBadge-dot': {
            backgroundColor: '#4caf50',
            width: 8,
            height: 8,
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 0 4px rgba(76, 175, 80, 0.5)',
          }
        }}
      >
        <TuneIcon sx={{
          fontSize: { xs: 18, sm: 20 },
          transition: 'all 0.2s ease',
          transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)'
        }} />
      </Badge>
    ) : (
      <SettingsIcon sx={{
        fontSize: { xs: 18, sm: 20 },
        transition: 'all 0.2s ease',
        transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)'
      }} />
    );
  };

  // Enhanced mobile preferences icon
  const getMobilePreferencesIconStyles = () => {
    const isActive = currentView === 'preferences';

    return {
      backgroundColor: isActive
        ? COLORS.primary.main
        : 'rgba(255,255,255,0.9)',
      color: isActive ? 'white' : COLORS.primary.main,
      border: `2px solid ${COLORS.primary.main}`,
      borderRadius: 2.5,
      width: 44,
      height: 44,
      boxShadow: isActive
        ? `0 4px 15px ${COLORS.primary.main}40`
        : '0 2px 8px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: isActive
          ? COLORS.primary.dark
          : `${COLORS.primary.main}15`,
        transform: 'scale(1.05)',
        boxShadow: `0 6px 20px ${COLORS.primary.main}30`,
      },
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    };
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
          {/* Logo Section */}
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

              {/* Current Location Chip */}
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

          {/* Search Section */}
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

          {/* Actions Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 2,
              minWidth: 'fit-content',
            }}
          >
            {/* Mobile Menu */}
            {isMobile && (
              <Tooltip title="Menu">
                <IconButton
                  onClick={handleMenuOpen}
                  sx={getMobilePreferencesIconStyles()}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Desktop Preferences Button */}
            {!isMobile && (
              <Tooltip
                title={
                  currentView === 'preferences'
                    ? 'Back to Weather Dashboard'
                    : hasPreferences
                      ? 'Manage Your Weather Preferences'
                      : 'Set Your Weather Preferences'
                }
                arrow
                placement="bottom"
              >
                <Button
                  variant="contained"
                  onClick={onPreferencesClick}
                  startIcon={<PreferencesIcon />}
                  sx={getPreferencesButtonStyles()}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    {currentView === 'preferences' ? 'Weather' : 'Preferences'}
                  </Box>
                </Button>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Enhanced Mobile Menu */}
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
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          onClick={handleHomeClick}
          sx={{
            py: 1.5,
            '&:hover': {
              backgroundColor: `${COLORS.primary.main}10`,
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon
              fontSize="small"
              sx={{ color: COLORS.primary.main }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              '& .MuiTypography-root': {
                fontWeight: 600,
                color: COLORS.text.primary
              }
            }}
          >
            Home
          </ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5, backgroundColor: `${COLORS.primary.main}20` }} />

        <MenuItem
          onClick={handlePreferencesClick}
          sx={{
            py: 1.5,
            backgroundColor: currentView === 'preferences'
              ? `${COLORS.primary.main}15`
              : 'transparent',
            '&:hover': {
              backgroundColor: `${COLORS.primary.main}20`,
            },
          }}
        >
          <ListItemIcon>
            <Badge
              badgeContent={hasPreferences ? "" : null}
              color="success"
              variant="dot"
              invisible={!hasPreferences}
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: '#4caf50',
                  width: 6,
                  height: 6,
                }
              }}
            >
              {currentView === 'preferences' ? (
                <FavoriteIcon
                  fontSize="small"
                  sx={{ color: COLORS.primary.main }}
                />
              ) : (
                <SettingsIcon
                  fontSize="small"
                  sx={{ color: COLORS.primary.main }}
                />
              )}
            </Badge>
          </ListItemIcon>
          <ListItemText
            sx={{
              '& .MuiTypography-root': {
                fontWeight: currentView === 'preferences' ? 700 : 600,
                color: currentView === 'preferences'
                  ? COLORS.primary.main
                  : COLORS.text.primary
              }
            }}
          >
            My Preferences
          </ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopBar;