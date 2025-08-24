import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { CityLookupResponse, UserSession, WeatherResponse, MultiWeatherResponse } from "../types/weather";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://weather-app-ajay5201s-projects.vercel.app/api/v1';

// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Include credentials if your backend expects them
  withCredentials: true,
});

// Request interceptor for adding common headers
axiosInstance.interceptors.request.use(
  (config:any) => {
    // Ensure headers are properly set for CORS
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // Log the request for debugging
    console.log('Making request to:', config.baseURL + config.url);
    console.log('Request headers:', config.headers);
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response received:', response.status, response.statusText);
    return response;
  },
  (error) => {
    // Enhanced error logging for CORS issues
    if (error.code === 'NETWORK_ERR' || error.message.includes('CORS')) {
      console.error('CORS Error detected:', {
        message: error.message,
        config: error.config,
        origin: window.location.origin,
        targetURL: error.config?.baseURL + error.config?.url
      });
    }
    
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });
    
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
        `/user/preferences/${sessionId}`
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
      const response = await axiosInstance.get<WeatherResponse>(`/weather/${encodeURIComponent(city)}/forecast`);
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
      });
      return response.data;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },

  // Health check method for testing CORS
  async healthCheck(): Promise<any> {
    try {
      const response = await axiosInstance.get('/health-check');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};

// Export axios instance if you need it elsewhere
export { axiosInstance };