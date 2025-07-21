import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import { fetchWeatherByCity } from "./weatherApi";
import "./weatherStyles.css";

function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>🌦️ Weather Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default WeatherDashboard;
