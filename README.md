# Weather Forecast App

A modern, responsive weather forecast application built with React, TypeScript, and Material-UI (MUI). This app provides real-time weather information with a beautiful, professional interface designed to impress.

## Features

- 🌍 **Automatic Location Detection**: Automatically detects user's current city using geolocation
- 🔍 **Smart City Search**: Typeahead search with city lookup API
- 🌤️ **Current Weather**: Detailed current weather information with beautiful icons
- 📅 **Hourly Forecast**: 24-hour weather forecast with horizontal scrolling
- 📊 **7-Day Forecast**: Weekly weather predictions in a responsive grid layout
- 💾 **User Preferences**: Save and manage your favorite cities with easy access
- 🗑️ **Remove Cities**: Delete cities from your preferences with a single click
- 📱 **Responsive Design**: Optimized for all device sizes
- 🎨 **Professional UI**: Modern Material Design with custom color scheme
- ⚡ **Real-time Updates**: Live weather data from weather API
- 🔄 **Session Management**: Unique session IDs for each user

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons
- **HTTP Client**: Fetch API
- **State Management**: React Hooks

## Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## API Configuration

The app requires the following API endpoints to be running:

### Base URL: `http://localhost:3000/api/v1`

#### 1. Create User Session
```http
POST /api/v1/user
Content-Type: application/json

{
  "sessionId": "uuid-string",
  "city": "City Name"
}
```

#### 2. Get Weather Forecast
```http
GET /api/v1/weather/{city}/forecast
Accept: application/json
```

#### 3. City Lookup Search
```http
GET /api/v1/city-lookup/search?query={search-term}
Accept: application/json
```

#### 4. Multi-City Weather Forecast
```http
GET /api/v1/weather/multi-forecast?cities={city1,city2,city3}
Accept: application/json
```

#### 5. Get User Preferences
```http
GET /api/v1/user/preferences/{sessionId}
Accept: application/json
```

#### 6. Remove City from Preferences
```http
DELETE /api/v1/user/remove-city
Content-Type: application/json

{
  "sessionId": "uuid-string",
  "city": "City Name"
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── CitySearch.tsx  # City search with typeahead
│   ├── CurrentWeather.tsx # Current weather display
│   ├── DailyForecast.tsx  # 7-day forecast
│   ├── ErrorMessage.tsx   # Error display component
│   ├── HourlyForecast.tsx # Hourly forecast
│   ├── LoadingSpinner.tsx # Loading states
│   ├── Preferences.tsx    # User preferences management
│   └── TopBar.tsx         # Navigation bar
├── constants/
│   └── colors.ts       # Color scheme constants
├── services/
│   └── api.ts          # API service functions
├── types/
│   └── weather.ts      # TypeScript type definitions
├── utils/
│   └── helpers.ts      # Utility functions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Components

### CitySearch
- Typeahead search functionality
- Debounced API calls (300ms delay)
- Beautiful dropdown with city information
- Responsive design for mobile and desktop

### CurrentWeather
- Large temperature display with weather icons
- Detailed weather metrics (humidity, wind, pressure)
- Sunrise/sunset information
- Color-coded weather conditions

### HourlyForecast
- Horizontal scrolling 24-hour forecast
- Weather icons and precipitation chances
- Wind speed information
- Smooth hover animations

### DailyForecast
- Responsive grid layout for 7-day forecast
- High/low temperature display
- Weather conditions and icons
- Precipitation probability

### Preferences
- **Modal-based interface** for managing saved cities
- **Responsive grid layout** displaying all user preferences
- **One-click deletion** with visual feedback
- **Click to view weather** functionality for quick access
- **Empty state** with helpful messaging
- **Loading states** and error handling
- **Efficient batch API** for fetching weather data for all cities in a single request
- **Dynamic weather cards** with background gradients based on weather conditions

## Color Scheme

The app uses a professional color palette defined in `src/constants/colors.ts`:

- **Primary**: Blue tones (#1976d2)
- **Weather-specific**: Colors for different weather conditions
- **Temperature**: Heat map colors for temperature ranges
- **Background**: Clean whites and grays
- **Text**: High contrast for readability

## Responsive Design

- **Mobile-first approach**
- **Breakpoints**: xs, sm, md, lg, xl
- **Adaptive layouts** for different screen sizes
- **Touch-friendly** interactions on mobile devices

## Performance Features

- **Debounced search** to reduce API calls
- **Lazy loading** of weather data
- **Optimized re-renders** with React hooks
- **Efficient state management**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Environment Variables

No environment variables are required for basic functionality. The API base URL is configured in `src/services/api.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

Built with ❤️ using React and Material-UI
