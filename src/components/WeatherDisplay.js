import React from 'react';

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: 'long', 
    month: 'short',
    day: 'numeric'
  });
}

function WeatherDisplay({ data, unit }) {
  const { list, city } = data;

  const dailyForecast = list.filter((entry, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="weather-display">
      <h2>Weather in {city.name}</h2>
      <div>Temperature: {list[0].main.temp}° {unit === 'metric' ? 'C' : 'F'}</div>
      <div>Weather: {list[0].weather[0].description}</div>

      <h3>5-Day Forecast (24-hour Intervals)</h3>
      <div className="forecast">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div style={{color:'blue'}} >{formatDate(day.dt)}</div>
            <div>Temp: {day.main.temp}° {unit === 'metric' ? 'C' : 'F'}</div>
            <div style={{color:'gray'}} >{day.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
