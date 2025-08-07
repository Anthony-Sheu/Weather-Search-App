import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {

  const [weather, setWeather] = useState(null)

  const fetchWeather = async (city) => {
    try {
      const locRes = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`
      )
      const locations = await locRes.json()
      if (!locations.length) {
        alert('City not found')
        return
      }
      const locationKey = locations[0].Key
      const weatherRes = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
      )
      const weatherData = await weatherRes.json()
      setWeather({
        text: weatherData[0].WeatherText,
        temp: weatherData[0].Temperature.Metric.Value,
        unit: weatherData[0].Temperature.Metric.Unit,
      })
    } catch (err) {
      console.error('Fetch error:', err)
      alert('Error fetching weather')
    }
  }

  return (
    <div className="app-container">
      <h2>Weather Search App</h2>
      <SearchBar onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} />
    </div>
  )
}

export default App
