import axios from 'axios';

export interface WeatherData {
  name: string; // city name
  temperature: number; // Celsius
  description: string;
  icon: string; // OpenWeather icon code
  humidity: number;
  windSpeed: number; // m/s
}

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

function getApiKey(): string | null {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;
  return key && key.trim().length > 0 ? key : null;
}

export async function getWeatherByCity(city: string, countryCode?: string): Promise<WeatherData> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Missing OpenWeather API key. Set VITE_OPENWEATHER_API_KEY in your .env.');

  const q = countryCode ? `${city},${countryCode}` : city;
  const { data } = await axios.get(API_BASE, {
    params: { q, appid: apiKey, units: 'metric' },
  });
  return mapWeather(data);
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Missing OpenWeather API key. Set VITE_OPENWEATHER_API_KEY in your .env.');

  const { data } = await axios.get(API_BASE, {
    params: { lat, lon, appid: apiKey, units: 'metric' },
  });
  return mapWeather(data);
}

function mapWeather(data: any): WeatherData {
  return {
    name: data.name,
    temperature: data.main?.temp ?? 0,
    description: data.weather?.[0]?.description ?? 'N/A',
    icon: data.weather?.[0]?.icon ?? '01d',
    humidity: data.main?.humidity ?? 0,
    windSpeed: data.wind?.speed ?? 0,
  };
}