import React, { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherByCoords, WeatherData } from '../services/weather';
import { FaLocationArrow, FaSyncAlt } from 'react-icons/fa';

const WeatherApp: React.FC = () => {
  const [query, setQuery] = useState('Lagos');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  const fetchCity = async (city: string) => {
    setLoading(true); setError(null);
    try {
      const result = await getWeatherByCity(city);
      setData(result);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const fetchGeo = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setLoading(true); setError(null);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const result = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        setData(result);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    }, (err) => {
      setLoading(false);
      setError(err.message || 'Failed to get location');
    });
  };

  useEffect(() => {
    fetchCity(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city..."
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid var(--border-color)' }}
        />
        <button onClick={() => fetchCity(query)} style={{ padding: '8px 12px' }} title="Search">
          <FaSyncAlt />
        </button>
        <button onClick={fetchGeo} style={{ padding: '8px 12px' }} title="Use my location">
          <FaLocationArrow />
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'var(--accent-color)' }}>{error}</div>}

      {data && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 12,
          alignItems: 'center',
          background: 'var(--window-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 12
        }}>
          <img
            alt={data.description}
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            width={64}
            height={64}
          />
          <div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{Math.round(data.temperature)}°C</div>
            <div style={{ textTransform: 'capitalize' }}>{data.description}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{data.name}</div>
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 16, marginTop: 8, fontSize: 12 }}>
            <div>Humidity: {data.humidity}%</div>
            <div>Wind: {data.windSpeed} m/s</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;