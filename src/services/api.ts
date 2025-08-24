import type { CityLookupResponse, UserSession, WeatherResponse, MultiWeatherResponse } from "../types/weather";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiService = {
  // Create user session and get current city
  async createUserSession(sessionId: string, city: string): Promise<UserSession> {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, city }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating user session:', error);
      throw error;
    }
  },

  // Get user preferences (searched cities)
  async getUserPreferences(sessionId: string): Promise<{ status: string; data: string[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/preferences/${sessionId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user preferences');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  },

  // Remove city from user preferences
  async removeCityFromPreferences(sessionId: string, city: string): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/remove-city`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, city }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove city from preferences');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing city from preferences:', error);
      throw error;
    }
  },

  // Get weather forecasts for multiple cities in a single request
  async getMultiWeatherForecast(sessionId:string): Promise<MultiWeatherResponse> {
    try {

      const response = await fetch(`${API_BASE_URL}/weather/multi-forecast-for-session?session-id=${encodeURIComponent(sessionId)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch multi-city weather forecast');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching multi-city weather forecast:', error);
      throw error;
    }
  },


  async addCityToUser(sessionId: string, city: string): Promise<UserSession> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/add-city`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, city }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating user session:', error);
      throw error;
    }
  },

  // Get weather forecast for a city
  async getWeatherForecast(city: string): Promise<WeatherResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(city)}/forecast`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  },

  // Search cities with typeahead
  async searchCities(query: string): Promise<CityLookupResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/city-lookup/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to search cities');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },
};
