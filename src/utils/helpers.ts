import { v4 as uuidv4 } from 'uuid';

// Generate a unique session ID
export const generateSessionId = (): string => {
  return uuidv4();
};

// Get user's current city using geolocation and reverse geocoding
export const getUserCurrentCity = (): Promise<string> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
    
      resolve('Coimbatore');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            resolve(data.city || data.locality || 'Unknown City');
          } else {
            resolve('Coimbatore'); 
          }
        } catch (error) {
          console.error('Error getting city from coordinates:', error);
          resolve('Coimbatore'); 
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        resolve('Coimbatore'); 
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

// Format temperature with proper units
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

// Format time for display
export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Get weather condition color
export const getWeatherConditionColor = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return '#2196f3'; // Blue for rain
  } else if (conditionLower.includes('cloud')) {
    return '#78909c'; // Gray for clouds
  } else if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
    return '#ff9800'; // Orange for sun
  } else if (conditionLower.includes('snow')) {
    return '#90caf9'; // Light blue for snow
  } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return '#5c6bc0'; // Dark blue for storms
  } else {
    return '#4caf50'; // Green for other conditions
  }
};

export const isToday = (date: string) => {
  const dayDate = new Date(date);
  const today = new Date();
  return dayDate.toDateString() === today.toDateString();
};

export const getDayDisplayName = (date: string) => {
  if (isToday(date)) return 'Today';
  const dayDate = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dayDate.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return formatDate(date);
};
