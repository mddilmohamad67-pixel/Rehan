# REHAN - AI SaaS Platform - Weather Dashboard Extension

Production-ready AI SaaS web application with Firebase integration, modern UI, comprehensive AI tools, AND a beautiful weather dashboard.

## 🎯 New Feature: Weather Dashboard

A real-time weather dashboard that fetches data from public weather APIs:

### Features
- **Current Weather Display** - Real-time temperature, conditions, humidity, wind speed
- **Multi-Location Support** - Track weather for multiple cities
- **Hourly & Daily Forecast** - 24-hour hourly forecast and 7-day forecast
- **Weather Maps** - Interactive weather visualization
- **Alert System** - Severe weather alerts and notifications
- **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Theme toggle support
- **Weather History** - Track weather trends
- **Favorites** - Save favorite locations
- **Real-time Updates** - Auto-refresh weather data

### Technology Stack
- **API:** OpenWeatherMap API / WeatherAPI
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Caching:** Local Storage & Firebase Firestore
- **Real-time:** Socket.io for live updates (optional)

## 🚀 Features

### AI Tools (20+)
- AI Chat (GPT-like)
- Image Generation, Editing & Upscaling
- Video Generation & Editing
- Voice Generation & Speech to Text
- Music Generation
- Coding Assistant with Error Fixing
- Website Generator
- Logo Generator
- Presentation Generator
- PDF Chat & Document Generator
- Translation & Summarizer
- OCR & Resume Builder
- **Weather Dashboard** ⭐ NEW

### Authentication
- Firebase Authentication
- Google OAuth Login
- Email/Password Authentication
- Phone OTP Login
- Forgot Password Recovery
- User Profile Management
- Session Management

## 📋 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **API Client:** Axios + React Query
- **Charts:** Recharts
- **Maps:** Leaflet (for weather maps)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Firebase Firestore
- **Functions:** Firebase Cloud Functions

### Weather APIs
- OpenWeatherMap
- WeatherAPI
- Weatherstack (optional backup)

## 📁 Project Structure

See [existing structure] + Weather Dashboard additions:

```
frontend/
├── src/
│   ├── app/
│   │   └── (dashboard)/
│   │       ├── weather/
│   │       │   ├── page.tsx
│   │       │   ├── [city]/
│   │       │   └── hooks/
│   ├── components/
│   │   └── weather/
│   │       ├── CurrentWeather.tsx
│   │       ├── Forecast.tsx
│   │       ├── WeatherMap.tsx
│   │       └── Alerts.tsx
│   └── lib/
│       └── weather.ts
```

## 🛠️ Installation & Setup

[See existing INSTALLATION.md]

### Weather Dashboard Setup

1. **Get Weather API Key**
```bash
# OpenWeatherMap
Visit: https://openweathermap.org/api
Get free API key

# Or WeatherAPI
Visit: https://www.weatherapi.com/
Get free API key
```

2. **Configure Environment Variables**
```env
# .env.local
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_GEOLOCATION_ENABLED=true
```

3. **Backend Endpoint**
```bash
# Backend .env
WEATHER_API_KEY=your_weather_api_key
WEATHER_CACHE_TIME=300  # 5 minutes
```

## 📊 Weather Dashboard Usage

### Access Dashboard
```
http://localhost:3000/dashboard/weather
```

### Features Overview

#### 1. Current Weather
- Temperature, feels like temp
- Weather conditions & description
- Humidity, pressure, wind speed
- UV index, visibility
- Sunrise/sunset times

#### 2. Forecast
- 24-hour hourly forecast
- 7-day daily forecast
- Precipitation probability
- Temperature trends

#### 3. Location Management
- Search for cities
- Auto-detect current location
- Save favorite locations
- Multiple location tracking

#### 4. Alerts & Notifications
- Severe weather alerts
- Temperature warnings
- Wind speed notifications
- Custom alerts

## 🔌 API Integration

### Weather Endpoints

#### Get Current Weather
```bash
GET /api/weather/current?city=London

Response:
{
  "success": true,
  "data": {
    "temperature": 15,
    "feels_like": 13,
    "condition": "Cloudy",
    "humidity": 72,
    "wind_speed": 12,
    "pressure": 1013,
    "visibility": 10,
    "uv_index": 4
  }
}
```

#### Get Forecast
```bash
GET /api/weather/forecast?city=London&days=7

Response:
{
  "success": true,
  "forecast": [
    {
      "date": "2024-01-02",
      "high": 18,
      "low": 12,
      "condition": "Partly Cloudy",
      "precipitation": 20,
      "wind_speed": 15
    }
  ]
}
```

#### Search Cities
```bash
GET /api/weather/search?q=Lon

Response:
{
  "success": true,
  "cities": [
    {
      "name": "London",
      "country": "UK",
      "latitude": 51.51,
      "longitude": -0.13
    }
  ]
}
```

## 🎨 UI Components

### Weather Card
```tsx
import WeatherCard from '@/components/weather/WeatherCard';

<WeatherCard 
  city="London"
  temperature={15}
  condition="Cloudy"
  humidity={72}
/>
```

### Forecast Component
```tsx
import Forecast from '@/components/weather/Forecast';

<Forecast 
  days={7}
  data={forecastData}
/>
```

## 🔐 Security

- API keys stored securely
- Rate limiting on weather endpoints
- User authentication required for favorites
- HTTPS only

## 📈 Performance

- Weather data caching (5-minute TTL)
- Image optimization for weather icons
- Lazy loading of forecast data
- CDN for static assets

## 🚀 Deployment

[See existing DEPLOYMENT.md]

Weather Dashboard is automatically deployed with frontend.

## 📚 Documentation

- [Installation Guide](./docs/INSTALLATION.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Security Guide](./docs/SECURITY.md)
- **[Weather Dashboard Guide](./docs/WEATHER_DASHBOARD.md)** ⭐ NEW

## 🎯 Future Enhancements

- [ ] Weather alerts webhook integration
- [ ] Air quality index integration
- [ ] Satellite imagery
- [ ] Advanced weather analytics
- [ ] Weather-based recommendations
- [ ] Integration with calendar for event planning
- [ ] Weather API marketplace integration

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- Contact support at support@rehan.app

## 📄 License

MIT License - see LICENSE file for details.

---

**Version:** 1.1.0 (With Weather Dashboard)
**Last Updated:** 2026-07-03
