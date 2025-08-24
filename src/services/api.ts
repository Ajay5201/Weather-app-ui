import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { CityLookupResponse, UserSession, WeatherResponse, MultiWeatherResponse } from "../types/weather";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding common headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any common headers or auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Create user session and get current city
  async createUserSession(sessionId: string, city: string): Promise<UserSession> {
    try {
      const response = await axiosInstance.post<UserSession>('/user', {
        sessionId,
        city,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user session:', error);
      throw error;
    }
  },

  // Get user preferences (searched cities)
  async getUserPreferences(sessionId: string): Promise<{ status: string; data: string[] }> {
    try {
      const response = await axiosInstance.get<{ status: string; data: string[] }>(
        `/user/preferences/${sessionId}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  },

  // Remove city from user preferences
  async removeCityFromPreferences(sessionId: string, city: string): Promise<{ status: string; message: string }> {
    try {
      const response = await axiosInstance.delete<{ status: string; message: string }>('/user/remove-city', {
        data: {
          sessionId,
          city,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error removing city from preferences:', error);
      throw error;
    }
  },

  // Get weather forecasts for multiple cities in a single request
  async getMultiWeatherForecast(sessionId: string): Promise<MultiWeatherResponse> {
    try {
      const response = await axiosInstance.get<MultiWeatherResponse>('/weather/multi-forecast-for-session', {
        params: {
          'session-id': sessionId,
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching multi-city weather forecast:', error);
      throw error;
    }
  },

  // Add city to user
  async addCityToUser(sessionId: string, city: string): Promise<UserSession> {
    try {
      const response = await axiosInstance.post<UserSession>('/user/add-city', {
        sessionId,
        city,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding city to user:', error);
      throw error;
    }
  },

  // Get weather forecast for a city
  async getWeatherForecast(city: string): Promise<WeatherResponse> {
    try {
      const response = await axiosInstance.get<WeatherResponse>(`/weather/${encodeURIComponent(city)}/forecast`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  },

  // Search cities with typeahead
  async searchCities(query: string): Promise<CityLookupResponse> {
    try {
      const response = await axiosInstance.get<CityLookupResponse>('/city-lookup/search', {
        params: {
          query: query,
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },
};

// Export axios instance if you need it elsewhere
export { axiosInstance };