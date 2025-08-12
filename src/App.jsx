import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY

const App = () => {
  return (
    <div className='app'>
      <WeatherDisplay />
    </div>
  )
}

export default App
