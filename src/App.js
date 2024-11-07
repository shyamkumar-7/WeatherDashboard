import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import './styles.css';

const API_KEY = process.env.REACT_APP_API_KEY;  

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(localStorage.getItem('lastCity') || '');
  const [unit, setUnit] = useState('metric'); 
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
    fetchFavorites();
  }, [city, unit]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
      setWeatherData(response.data);
      localStorage.setItem('lastCity', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:3001/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const addFavorite = async () => {
    if (!favorites.some(fav => fav.name === city)) {
      try {
        const newFavorite = { name: city };
        await axios.post('http://localhost:3001/favorites', newFavorite);
        setFavorites([...favorites, newFavorite]);
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    }
  };

  const removeFavorite = async (cityToRemove) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${cityToRemove.id}`);
      setFavorites(favorites.filter(fav => fav.id !== cityToRemove.id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <button onClick={toggleUnit}>
        {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>
      <Search setCity={setCity} />
      {weatherData && <WeatherDisplay data={weatherData} unit={unit} />}
      <Favorites favorites={favorites} setCity={setCity} removeFavorite={removeFavorite} />
      <button onClick={addFavorite}>Add to Favorites</button>
    </div>
  );
}

export default App;
